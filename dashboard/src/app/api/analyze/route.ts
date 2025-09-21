import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";
import * as csstree from "css-tree";
import { features } from "web-features";

import { FeatureStatus, FeatureData, Report } from "../types";

export async function POST(request: any) {
  // console.log(request.body);
  try {
    const data = await request.json();
    const targetUrl = data.url;

    if (!targetUrl) {
      return NextResponse.json({ message: "URL is required" }, { status: 500 });
    }

    // --- Step 1: Fetch the Content (HTML) ---
    const browserHeaders = {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "Accept-Language": "en-US,en;q=0.9",
    };

    const htmlData = await axios.get(targetUrl, {
      responseType: "document",
      headers: browserHeaders,
    });

    // --- Step 3: Parse HTML to find CSS sources ---
    const $ = cheerio.load(htmlData.data);

    // console.log("Original HTML", htmlData.data);
    let allCss = "";

    // Extract from <style> blocks
    $("style").each((i, el) => {
      allCss += $(el).html();
    });

    // Fetch the CSS Library
    const stylesheetUrls: any = [];
    $('link[rel="stylesheet"]').each((i, el) => {
      const href = $(el).attr("href");
      if (href) {
        const absoluteUrl = new URL(href, targetUrl).href;
        stylesheetUrls.push(absoluteUrl);
      }
    });

    const cssResponses = await Promise.allSettled(
      stylesheetUrls.map((url: string) =>
        axios.get(url, { headers: browserHeaders })
      )
    );

    cssResponses.forEach((response) => {
      if (response.status === "fulfilled") {
        allCss += response.value.data;
      } else {
        console.warn(`Failed to fetch CSS from ${response.reason.config.url}`);
      }
    });

    // Parse CSS to AST
    const cssProperties = new Set();
    const ast = csstree.parse(allCss, {
      onParseError: (error) => {
        console.log(`CSS Parse Error: ${error.message}`);
      },
    });

    // traverse AST
    csstree.walk(ast, (node: any) => {
      if (node.type === "Declaration") {
        cssProperties.add(node.property);
      }
    });

    const report: any = {
      summary: {
        total: 0,
        high: 0,
        low: 0,
        not_found: 0,
      },
      properties: {},
    };

    for (const prop of cssProperties) {
      const featureData = features[`${prop}`];
      let status = " ";
      let isCssProperty;

      // check for CSS only : Look for 'css.properties.' in the compat_features array.
      if (featureData) {
        // console.log(featureData);
        isCssProperty = featureData.compat_features?.some((compat) =>
          compat.startsWith("css.properties.")
        );
      }

      if (isCssProperty && featureData.status && featureData.status.baseline) {
        // console.log(featureData.description);
        status = featureData.status.baseline;
      } else {
        status = "not_found";
      }

      report.summary[status]++;
      report.summary.total++;
      report.properties[status] = [...(report.properties[status] || []), prop];
    }

    // console.log(report);

    return NextResponse.json({
      message: report,
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

import { NextFunction, Request, RequestHandler, Response } from "express";
import { HttpError } from "../errors/http-error";
import { nanoid } from "nanoid"; // nanoid 3.3.4, yang terbaru tidak jalan di sini. nanoidnya harus diimpor pakai require, disini harus pakai import kalau dilihat dari error di terminal
import dotenv from "dotenv";
import UrlModel from "../model/url";

dotenv.config();

const BASE = process.env.BASE;

interface ShortUrlBody {
  oriUrl: string;
}

export const shortenUrl: RequestHandler<
  unknown,
  unknown,
  ShortUrlBody,
  unknown
> = async (req, res, next) => {
  const oriUrl = req.body.oriUrl;

  try {
    if (!oriUrl) throw new HttpError(400, "Need Original URL");

    const urlData = await UrlModel.findOne({ oriUrl: oriUrl });
    if (urlData) {
      console.log(urlData);
      console.log("URL already shortened");
      res.status(200).json(urlData);
      return;
    }

    const urlId = nanoid(5);
    const shortUrl = `${BASE}/${urlId}`;
    const newShortenUrl = await UrlModel.create({
      urlId: urlId,
      oriUrl: oriUrl,
      shortUrl: shortUrl,
    });
    console.log(newShortenUrl);
    console.log("URL shortened");
    res.status(201).json(newShortenUrl);
  } catch (error) {
    next(error);
  }
};

export const getOriURL: RequestHandler = async (req, res, next) => {
  const urlId = req.params.urlId;
  try {
    if (!urlId) throw new HttpError(400, "Missing Parameter");

    const urlData = await UrlModel.findOne({ urlId: urlId });

    if (!urlData) {
      throw new HttpError(404, "URL not found");
    }

    res.redirect(urlData.oriUrl);
  } catch (error) {
    next(error);
  }
};

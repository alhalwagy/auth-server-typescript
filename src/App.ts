import express from 'express';

export class App {
  private static instance: express.Router;

  static getInstance(): express.Router {
    if (!App.instance) {
      App.instance = express.Router();
    }
    return App.instance;
  }
}

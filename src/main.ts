import View from "./classes/view";
import Store from "./classes/store";
import Controller from "./classes/controller";
import Template from "./classes/template";
import initUserData from "./functions/initUserData";
import { apiUrls } from "./types";

const store = new Store(apiUrls.render, initUserData());
const template = new Template();
const view = new View(template);
const controller = new Controller(view, store);

console.log("app initialized");

controller.init();

import View from "./classes/view";
import Store from "./classes/store";
import Controller from "./classes/controller";
import initUserData from "./functions/initUserData";

const store = new Store(initUserData());
const view = new View();
const controller = new Controller(view, store);

console.log("app initialized");

controller.init();

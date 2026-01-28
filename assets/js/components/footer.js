// assets/js/components/footer.js
import { injectComponent } from "../utils.js";

const FOOTER_URL = "./components/footer.html";

injectComponent({
  url: FOOTER_URL,
  mountId: "app-footer",
  cache: "no-store",
});

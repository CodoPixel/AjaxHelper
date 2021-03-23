"use strict";
class AjaxHelper {
    constructor() {
        this.xhr = new XMLHttpRequest();
        this.headers = [["X-Requested-With", "xmlhttprequest"]];
        this.mimeType = "application/json";
        this.onSuccess = () => { };
        this.onError = () => { };
    }
    addRequestHeader(name, value) {
        this.headers.push([name, value]);
    }
    overrideMimeType(mimeType) {
        this.mimeType = mimeType;
    }
    open(method, path, async = true) {
        this.xhr.open(method === "GET" ? "GET" : "POST", path, async);
        this.xhr.overrideMimeType(this.mimeType);
        for (var header of this.headers)
            this.xhr.setRequestHeader(header[0], header[1]);
        var self = this;
        this.xhr.onload = () => {
            if (self.xhr.readyState === XMLHttpRequest.DONE) {
                if (self.xhr.status === 200) {
                    self.onSuccess(self.xhr.response);
                }
                else {
                    self.onError(self.xhr.status);
                }
            }
        };
    }
    send(data) {
        this.xhr.send(data);
    }
}

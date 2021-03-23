class AjaxHelper {
	public xhr: XMLHttpRequest = new XMLHttpRequest();
	public headers: [string, string][] = [["X-Requested-With", "xmlhttprequest"]];
	public mimeType: string = "application/json";
	public onSuccess: (response: any) => void;
	public onError: (status: number) => void;

	public constructor() {
		this.onSuccess = () => {};
		this.onError = () => {};
	}

	public addRequestHeader(name: string, value: string): void {
		this.headers.push([name, value]);
	}

	public overrideMimeType(mimeType: string): void {
		this.mimeType = mimeType;
	}

	public open(method: "GET" | "POST", path: string, async: boolean = true): void {
		this.xhr.open(method === "GET" ? "GET" : "POST", path, async);
		this.xhr.overrideMimeType(this.mimeType);
		for (var header of this.headers) this.xhr.setRequestHeader(header[0], header[1]);

		var self = this;
		this.xhr.onload = () => {
			if (self.xhr.readyState === XMLHttpRequest.DONE) {
				if (self.xhr.status === 200) {
					self.onSuccess(self.xhr.response);
				} else {
					self.onError(self.xhr.status);
				}
			}
		};
	}

	public send(data: any): void {
		this.xhr.send(data);
	}
}

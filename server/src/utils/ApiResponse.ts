type ApiResponseData = any;

class ApiResponse {
    public statusCode: number;
    public data?: ApiResponseData;
    public message: string;
    public success: boolean;

    constructor(statusCode: number, data?: ApiResponseData, message: string = "success") {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    }
}

export { ApiResponse }
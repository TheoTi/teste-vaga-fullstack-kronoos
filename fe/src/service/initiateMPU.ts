import axios from "axios";

type InitiateMPUParams = {
	filename: string;
	totalChunks: number;
};

type InitiateMPUResponse = {
	key: string;
	uploadId: string;
	parts: {
		url: string;
		partNumber: number;
	}[];
};

export async function initiateMPU({
	filename,
	totalChunks,
}: InitiateMPUParams): Promise<InitiateMPUResponse> {
	const url =
		"https://e4hi6x4a2k.execute-api.sa-east-1.amazonaws.com/initiate-mpu";

	const { data } = await axios.post<InitiateMPUResponse>(url, {
		filename,
		totalChunks,
	});

	return data;
}

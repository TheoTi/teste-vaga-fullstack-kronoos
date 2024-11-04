import axios from "axios";

type AbortMPUParams = {
	fileKey: string;
	uploadId: string;
};

export async function abortMPU({ fileKey, uploadId }: AbortMPUParams) {
	const url =
		"https://e4hi6x4a2k.execute-api.sa-east-1.amazonaws.com/abort-mpu";

	await axios.delete(url, {
		data: {
			fileKey,
			uploadId,
		},
	});
}

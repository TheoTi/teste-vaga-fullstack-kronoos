import axios from "axios";

type CompleteMPUParams = {
	fileKey: string;
	uploadId: string;
	parts: {
		partNumber: number;
		entityTag: string;
	}[];
};

export async function completeMPU({
	fileKey,
	parts,
	uploadId,
}: CompleteMPUParams) {
	const url =
		"https://e4hi6x4a2k.execute-api.sa-east-1.amazonaws.com/complete-mpu";

	await axios.post(url, {
		fileKey,
		parts,
		uploadId,
	});
}

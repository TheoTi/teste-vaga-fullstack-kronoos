export const env = {
	DYNAMO_KRONOOS_RECORDS_TABLE: process.env.DYNAMO_KRONOOS_RECORDS_TABLE!,
	DYNAMO_KRONOOS_UPLOADS_CONTROL_TABLE:
		process.env.DYNAMO_KRONOOS_UPLOADS_CONTROL_TABLE!,
	CONTROL_CHUNKS_QUEUE_URL: process.env.CONTROL_CHUNKS_QUEUE_URL!,
	KRONOOS_UPLOADS_BUCKET_TEST_NAME:
		process.env.KRONOOS_UPLOADS_BUCKET_TEST_NAME!,
};

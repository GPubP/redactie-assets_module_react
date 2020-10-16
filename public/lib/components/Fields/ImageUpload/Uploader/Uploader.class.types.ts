export interface InvalidFile {
	reasons: string[];
	file: File;
}

export interface ValidatedFiles {
	validFiles: File[];
	invalidFiles: InvalidFile[];
}

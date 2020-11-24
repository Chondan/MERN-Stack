function getFullPath(path) {
	const homeDir = process.env.REACT_APP_HOME_DIR || '';
	return `${homeDir}${path}`
}

export { getFullPath };
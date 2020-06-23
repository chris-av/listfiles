function formatBytes(bytes) {
  if (bytes > 1000000000000) return `${(bytes / 1000000000000).toFixed(2)}T bytes`;
  if (bytes > 1000000000) return `${(bytes / 1000000000).toFixed(2)}G bytes`;
  if (bytes > 1000000) return `${(bytes / 1000000).toFixed(2)}M bytes`;
  if (bytes > 1000) return `${(bytes / 1000).toFixed(2)}k bytes`;
  return `${bytes} bytes`
}

module.exports = formatBytes;
const ValidUrlConvert = (name) => {
  const url = name
    ?.toString()
    .replaceAll(" ", "-")
    .replaceAll(",", "-")
    .replaceAll("&", "-");
  return url;
};

export default ValidUrlConvert;

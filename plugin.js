module.exports.requestHooks = [
  context => {
    let url = context.request.getUrl();
    let templateMatch = url.match(/\{([?&])(.*)\}/);
    if (templateMatch != null && templateMatch.length > 0) {
      let templateParams = templateMatch[2].split(",");
      if (templateMatch[1] == "?" || templateMatch[1] == "&") {
        let unhandled = templateParams.filter(it => !context.request.hasParameter(it));
        if (unhandled != null && unhandled.length > 0) {
          context.app.alert(
            "Warning: Unhandled URI Template Param",
            "The request uri contains unhandled template params: " + unhandled.join()
          );
        }
        context.request.setUrl(url.replace(templateMatch[0], ""));
      }
    }
  }
];

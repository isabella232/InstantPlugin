import autosize from "autosize"

const script = String.raw`<script type="text/javascript">
  var emojis = "tada, fire, grinning"
  var selector = "body"
  var url = window.location.href.replace(/(http:\/\/|https:\/\/)/gi, "").replace(/^\/|\/$/g, "");

  var iframe = document.createElement("iframe")
  iframe.src = "https://emojireact.com/embed?emojis=" + emojis.replace(/\s/g, "") + "&url=" + url
  iframe.scrolling = "no"
  iframe.frameBorder = "0"
  iframe.style = "border:none; overflow:hidden; height:35px;"

  var container = document.querySelector(selector)

  container.insertBefore(iframe, container.firstChild || container)
</script>`

export default function runDemo(app) {
  const {embedCodeInput, pluginDetailsForm} = app.refs

  embedCodeInput.autofocus = false
  embedCodeInput.value = script
  autosize.update(embedCodeInput)
  app.parseInput()

  const {option_2} = app.entities

  option_2.title = "Comma separated list of emoji names"
  app.toggleEntityTracking(option_2.element)
  app.activeStep = "embedCode"

  const fields = {
    "[name='app[title]']": "Emoji React",
    "[name='app[description]']": "React with your favorite Emojis!",
    "[name='email']": "demo@instantwordpressplugin.com"
  }

  Object
    .keys(fields)
    .forEach(name => pluginDetailsForm.querySelector(name).value = fields[name])

  app.imageUploader.imageURL = "/external-assets/tada.png"
}

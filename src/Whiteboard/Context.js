import { Emitter } from "../decorators/emitter";

export default function getContext(settings) {
  return Object.seal({
    emitter: new Emitter(),
    settings: settings
  })
}

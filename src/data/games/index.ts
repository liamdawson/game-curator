import IGame from "../../types/Game";

const req = require.context('!json-loader!./game-loader!./', true, /\.yml$/i);
const games = req.keys()
  .map(file => req(file) as IGame);

export default games;

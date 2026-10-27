declare namespace App {
  interface SessionData {
    user: import("./lib/types").SessionUser;
    tokens: import("./lib/server/fluxer").TokenSet;
  }
}

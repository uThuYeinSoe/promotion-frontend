export interface Agentngameauthority {
  randomId: string;
  gameUpdateRequestList: GameUpdateRequest[];
}

export interface GameUpdateRequest {
  gameCode: string;
}

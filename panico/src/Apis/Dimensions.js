import { Dimensions } from "react-native";

export const SH = Dimensions.get("window").height
export const SW = Dimensions.get("window").width

export const getHp = (p) => {
  return SH*p
}

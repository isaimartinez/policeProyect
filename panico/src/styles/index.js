import { StyleSheet} from "react-native";
import {SH, SW} from '../Apis/Dimensions'

export const styles =StyleSheet.create({
  fileBtn: {
    flex: 1, margin: 10,width: SH/5, height: SH/5,  borderRadius: 5, borderColor: "#64748b", borderWidth: 1, backgroundColor: "#e2e8f0", justifyContent: 'center', alignItems: 'center'
  }
}) 
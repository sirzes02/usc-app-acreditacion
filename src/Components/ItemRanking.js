import React from "react";
import { View, Text } from "react-native";
import styles from "../styles";

const ItemRanking = (props) => {
  return (
    <View
      style={
        props.id === 1
          ? styles.itemRankingPrimero
          : props.id === 2
          ? styles.itemRankingSegundo
          : props.id === 3
          ? styles.itemRankingTercero
          : styles.itemRanking
      }
    >
      <Text style={styles.bold}>
        {props.id}. {props.nombre}
      </Text>
      <Text style={styles.bold}>{props.puntos} Pts.</Text>
    </View>
  );
};

export default ItemRanking;

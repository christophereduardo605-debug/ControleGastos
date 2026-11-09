import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function ListaGastos({ navigation, gastos, setGastos }) {
  const total = gastos.reduce((soma, gasto) => soma + gasto.valor, 0);

  function excluirGasto(id) {
    const novaLista = gastos.filter((gasto) => gasto.id !== id);
    setGastos(novaLista);
  }

  return (
    <View style={styles.container}>
      <View style={styles.cardTotal}>
        <Text style={styles.textoTotal}>Total gasto</Text>
        <Text style={styles.valorTotal}>
          R$ {total.toFixed(2).replace(".", ",")}
        </Text>
      </View>

      <Text style={styles.titulo}>Meus gastos</Text>

      <FlatList
        data={gastos}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.vazio}>Nenhum gasto cadastrado ainda.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View>
              <Text style={styles.descricao}>{item.descricao}</Text>
              <Text style={styles.valor}>
                R$ {item.valor.toFixed(2).replace(".", ",")}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.botaoExcluir}
              onPress={() => excluirGasto(item.id)}
            >
              <Text style={styles.textoExcluir}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.botaoAdicionar}
        onPress={() => navigation.navigate("Adicionar Gasto")}
      >
        <Text style={styles.textoBotao}>+ Adicionar gasto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    padding: 20,
  },
  cardTotal: {
    backgroundColor: "#207a65",
    padding: 25,
    borderRadius: 15,
    marginBottom: 25,
  },
  textoTotal: {
    color: "#fff",
    fontSize: 16,
  },
  valorTotal: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 8,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#222",
  },
  vazio: {
    textAlign: "center",
    color: "#888",
    marginTop: 40,
  },
  item: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  descricao: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  valor: {
    fontSize: 15,
    color: "#207a65",
    marginTop: 5,
  },
  botaoExcluir: {
    backgroundColor: "#ffe5e5",
    padding: 10,
    borderRadius: 8,
  },
  textoExcluir: {
    color: "#d63031",
    fontWeight: "bold",
  },
  botaoAdicionar: {
    backgroundColor: "#207a65",
    padding: 17,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  textoBotao: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function AdicionarGasto({ navigation, gastos, setGastos }) {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [erro, setErro] = useState("");

  function salvarGasto() {
    const valorNumero = Number(valor.replace(",", "."));

    if (descricao.trim() === "") {
      setErro("Digite a descrição do gasto.");
      return;
    }

    if (
      valor.trim() === "" ||
      !Number.isFinite(valorNumero) ||
      valorNumero <= 0
    ) {
      setErro("Digite um valor maior que zero.");
      return;
    }

    const novoGasto = {
      id: Date.now().toString(),
      descricao: descricao.trim(),
      valor: valorNumero,
    };

    setGastos([...gastos, novoGasto]);

    setErro("");
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Adicionar novo gasto</Text>
      <Text style={styles.subtitulo}>Preencha os dados do seu gasto.</Text>

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Almoço, mercado, transporte..."
        value={descricao}
        onChangeText={setDescricao}
      />

      <Text style={styles.label}>Valor (R$)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 25,50"
        keyboardType="decimal-pad"
        value={valor}
        onChangeText={setValor}
      />

      {erro !== "" && <Text style={styles.erro}>{erro}</Text>}

      <TouchableOpacity style={styles.botao} onPress={salvarGasto}>
        <Text style={styles.textoBotao}>Salvar gasto</Text>
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
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 15,
    color: "#777",
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  erro: {
    color: "#d63031",
    fontSize: 14,
    marginBottom: 15,
  },
  botao: {
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

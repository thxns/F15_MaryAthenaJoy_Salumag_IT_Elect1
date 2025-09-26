

import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform
} from "react-native";

export default function HomeScreen() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const flatListRef = useRef(null);

  const sendMessage = () => {
    if (input.trim() === "") return;
    const newMessage = {
      id: Date.now().toString(),
      text: input,
      sender: "Me",
    };
    setMessages([...messages, newMessage]);
    setInput("");
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === "Me" ? styles.myMessage : styles.otherMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.messageList}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  messageList: {
    padding: 10,
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  messageBubble: {
    padding: 10,
    borderRadius: 15,
    marginVertical: 5,
    maxWidth: "75%",
  },
  myMessage: {
    backgroundColor: "#0078FF",
    alignSelf: "flex-end",
  },
  otherMessage: {
    backgroundColor: "#E0E0E0",
    alignSelf: "flex-start",
  },
  messageText: {
    color: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#0078FF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    justifyContent: "center",
  },
  sendText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

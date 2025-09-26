// CommentApp.js
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

export default function TabTwoScreen() {
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");

  const addComment = () => {
    if (input.trim() === "") return;
    const newComment = {
      id: Date.now().toString(),
      text: input,
      author: "User",
    };
    setComments([newComment, ...comments]); // newest on top
    setInput("");
  };

  const renderItem = ({ item }) => (
    <View style={styles.commentBox}>
      <Text style={styles.author}>{item.author}</Text>
      <Text style={styles.commentText}>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.post}>
        <Text style={styles.postTitle}>My Post</Text>
        <Text style={styles.postContent}>
          This is a sample post where users can leave comments below 👇
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Write a comment..."
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.button} onPress={addComment}>
          <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.commentList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9", padding: 10 },
  post: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  postTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  postContent: { fontSize: 14, color: "#333" },
  inputContainer: { flexDirection: "row", marginBottom: 15 },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  button: {
    backgroundColor: "#0078FF",
    paddingHorizontal: 15,
    justifyContent: "center",
    borderRadius: 20,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  commentList: { paddingBottom: 20 },
  commentBox: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 1,
  },
  author: { fontWeight: "bold", marginBottom: 3 },
  commentText: { fontSize: 14, color: "#333" },
});

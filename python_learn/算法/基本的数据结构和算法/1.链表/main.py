from single_list_node import Node,SingleLinkedList

if __name__ == "__main__":
  node1 = Node(15)  
  node2 = Node(8.2)  
  node3 = Node("Berlin")  
  node4 = Node(15)

  track = SingleLinkedList()  

  for current_node in [node1, node2, node3, node4]:  
      track.add_list_item(current_node)
      print("track length: %i" % track.list_length())
      track.output_list()
      
  results = track.unordered_search(15)  
  print(results)      
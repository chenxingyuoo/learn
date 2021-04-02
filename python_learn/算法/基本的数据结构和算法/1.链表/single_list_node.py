# 1。__init_(): initialize the node with the data
# 2。self.data: the value stored in the node
# 3。self.next: the reference pointer to the next node
# 4。 has_value(): compare a value with the node value
class Node:
    def __init__(self, data):
        "constructor to initiate this object"

        # store data
        self.data = data

        # store reference (next item)
        self.next = None
        return

    def has_value(self, value):
        "method to compare the value with the node data"
        if self.data == value:
            return True
        else:
            return False

class SingleLinkedList:  
    def __init__(self):
        "constructor to initiate this object"

        self.head = None
        self.tail = None
        return

    def add_list_item(self, item):
        "add an item at the end of the list"

        #如果不是 Node，构建为Node
        if not isinstance(item, Node):
            item = Node(item)

        #如果头节点是空，则当前节点就是 item
        if self.head is None:
            self.head = item
        else:
            #如果已经有头节点，则加到尾部
            self.tail.next = item
        
        #尾部就是当前绩点item了
        self.tail = item

        return     

    def list_length(self):
      "returns the number of list items"

      count = 0
      current_node = self.head

      while current_node is not None:
          # increase counter by one
          count = count + 1

          # jump to the linked node
          current_node = current_node.next

      return count    

    def output_list(self):

        "outputs the list (the value of the node, actually)"

        current_node = self.head

        while current_node is not None:
            print(current_node.data)

            # jump to the linked node
            current_node = current_node.next

        return             

    def unordered_search(self, value):
        "search the linked list for the node that has this value"

        # define current_node
        current_node = self.head

        # define position
        node_id = 1

        # define list of results
        results = []

        while current_node is not None:
            if current_node.has_value(value):
                results.append(node_id)

            # jump to the linked node
            current_node = current_node.next
            node_id = node_id + 1

        return results
        

    def remove_list_item_by_id(self, item_id):
        "remove the list item with the item id"

        current_id = 1
        current_node = self.head
        previous_node = None

        while current_node is not None:

            #当前这个node 就是需要移除的node
            if current_id == item_id:
                # if this is the first node (head)
                #如果这个node 前面还有node ，那需要把前面node 的next，指向当前node 的下一个node（原来前一个node 的next 是当前node）。
                # 就已经从这个链路里移除了，因为没有node 指向它了。
                if previous_node is not None:
                    previous_node.next = current_node.next
                else:
                    #需要移除的是第一个node，只要把当前的head 指向下一个node 即可
                    self.head = current_node.next
                    # we don't have to look any further
                    return

            # needed for the next iteration
            # 如果还不是当前node，上一个node 变成当前node
            # 当前node 变成当前node 的下一个。当然id 要加1
            previous_node = current_node
            current_node = current_node.next
            current_id = current_id + 1

        return        



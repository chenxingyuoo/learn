class Node2:
    def __init__(self, data):
        "constructor class to initiate this object"

        # store data
        self.data = data

        # store reference (next item)
        self.next = None

        # store reference (previous item)
        self.previous = None
        return

    def has_value(self, value):
        "method to compare the value with the node data"
        if self.data == value:
            return True
        else:
            return False

class DoubleLinkedList:
    def __init__(self):
        "constructor to initiate this object"

        self.head = None
        self.tail = None
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

    def unordered_search (self, value):
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





#略有不同
    def add_list_item(self, item):
        "add an item at the end of the list"

        if isinstance(item, Node2):

            #如果还没有Node，则首尾都是item，而且该node 的前一个没有，后一个也没有
            if self.head is None:
                self.head = item
                item.previous = None
                item.next = None
                self.tail = item
            else:
                #如果有Node 元素了，则当前尾部的node的下一个node 就是item，item的前一个元素就是当前的tail node。现在把item 放到尾部。
                self.tail.next = item
                item.previous = self.tail
                self.tail = item

        return




    #根据node id 移除node
    def remove_list_item_by_id(self, item_id):
        "remove the list item with the item id"

        current_id = 1
        current_node = self.head


        #当前node 不为空
        while current_node is not None:
            previous_node = current_node.previous
            next_node = current_node.next

            #当前node 就是需要移除的node
            if current_id == item_id:
                # if this is the first node (head)

                #当前node 不是第一个head node
                if previous_node is not None:

                    #前一个node的 next 指向 下个node
                    previous_node.next = next_node

                    # 如果当前node 不是tail node
                    if next_node is not None:

                        # next_node 前一个node 指向 当前node 的前一个node（原来next_node 的前一个node 是 当前node）
                        next_node.previous = previous_node
                else:

                    #如果需要移除的是head node，则把head 指向 next_node
                    self.head = next_node


                    # 如果 head node 不是最后一个node ，则还要把下一个node 的 previous 指向为None（原来为当前node）
                    if next_node is not None:
                        next_node.previous = None
                # we don't have to look any further
                return

            # needed for the next iteration
            current_node = next_node
            current_id = current_id + 1

        return            
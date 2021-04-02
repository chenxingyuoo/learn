from tree import TreeNode,Traversal

if __name__ == "__main__":
  root = TreeNode('A')
  root.left = TreeNode('B')
  root.right = TreeNode('C')

  root.left.left = TreeNode('D')
  root.left.right = TreeNode('E')

  root.right.left = TreeNode('F')

  root.left.left.left = TreeNode('G')
  root.left.left.right = TreeNode('H')

  traversal = Traversal()
  traversal.preorder(root)

  print("preorder", traversal.traverse_path)

  traversal = Traversal()
  traversal.inorder(root)

  print("inorder", traversal.traverse_path)

  traversal = Traversal()
  traversal.postorder(root)

  print("postorder", traversal.traverse_path)


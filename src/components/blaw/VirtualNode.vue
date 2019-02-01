
<script>
/**
 * A virtual-node is a functional component with no state and only serves to render the vnode passed in as a prop.
 * Useful for iterating thru slots and rendering them.
 */
export default {
  name: 'VirtualNode',
  functional: true,
  render (h, ctx) {
    return ctx.props.vnode
  }
}
</script>

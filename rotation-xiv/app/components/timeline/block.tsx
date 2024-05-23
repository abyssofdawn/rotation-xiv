import { Block as BlockType } from "@/app/utils";

export function Block(props: {block: BlockType}){
  const style = {
    transform: `translateX(${props.block.gcd})`
  }
  return (
  <div style={style}>
  
  </div>
)
}
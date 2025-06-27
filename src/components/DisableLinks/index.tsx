import Link from "next/link"

export default function DisableLink(props: any) {
  if (props.disable) {
    return <div {...props} >
      {props.children}
    </div>
  }
    return <Link {...props} >
      {props.children}
    </Link>
}

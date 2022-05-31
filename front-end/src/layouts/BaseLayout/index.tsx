import { ReactNode, FC } from "react"
import { Outlet } from "react-router-dom";

interface BaseLayoutProps {
    children?: ReactNode;
}

const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  return (
    <div>
        <header>Mon header</header>
        <main>{ children || <Outlet/> }</main>
        <footer>Mon footer</footer>
    </div>
  )
}

export default BaseLayout
import React from "react";

function NavBar() {
    return <div className="my-5">
        <ul className="flex">
            <li className="flex-2 mr-2">
                <a className="text-center block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white" href="#">전체</a>
            </li>
        </ul>
        <hr className="mt-5"/>
    </div>
}

export default NavBar;
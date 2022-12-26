import React from "react";

function Navbar() {
    return (
        <>
            <div class="h-16 w-full">
                <nav class="h-full w-full lg:px-2 glass3 flex items-center justify-between">
                    <div class="lg:px-4 px-1"><h1 class="cursor-pointer hover:scale-110 transition ease-in-out text-lg md:text-2xl lg:text-2xl font-serif uppercase">Shrey Kumar</h1></div>
                    <div class="flex space-x-1 lg:space-x-4 px-2 lg:px-4">
                        <h1 class="hover:scale-110 hover:border-b-2 border-lime-400 hover:font-semibold hover:transition hover:ease-in-out cursor-pointer">Home</h1>
                        <h1 class="hover:scale-110 hover:border-b-2 border-lime-400 hover:font-semibold hover:transition hover:ease-in-out cursor-pointer">About</h1>
                        <h1 class="hover:scale-110 hover:border-b-2 border-lime-400 hover:font-semibold hover:transition hover:ease-in-out cursor-pointer">Contact</h1>
                    </div>
                </nav>
            </div>
        </>
    );
}
export default Navbar;
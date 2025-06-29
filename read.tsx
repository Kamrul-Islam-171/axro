{isMobileOpen && (
        <div className="md:hidden absolute top-14 left-0 right-0 bg-background border-t shadow-lg ">
          <div className="flex flex-col gap-5 px-4 py-6">
            {navLinks.map((navItem, idx:number) => (
              <div key={idx}>
                {navItem.isDropDown ? (
                  <div>
                    {/* If the clicked item (idx) is already open (isMobileChild === idx), then: setIsMobileChild(null) */}
                    {/* Otherwise (it's not open yet):setIsMobileChild(idx) */}
                    <div
                      className="flex items-center gap-2"
                      onClick={() =>
                        setIsMobileChild(isMobileChild === idx ? null : idx)
                      }
                    >
                      <div>{navItem.name}</div>
                      <ChevronDown className="w-4 h-4 mt-1 text-gray-500" />
                    </div>

                    {/* {isMobileChild === idx &&(<div className="flex flex-col px-4 py-1 gap-1 transition-all duration-300 ease-in-out overflow-hidden">
                      {navItem?.children?.map((cItem, idx) => (
                        <Link className="" href={cItem.href} key={idx}>
                          {cItem.cname}
                        </Link>
                      ))}
                    </div>)} */}

                    {/* animated dropdown */}
                    <div
                      className={`trainsition-all duration-400 ease-in-out overflow-hidden ${
                        isMobileChild === idx  ? "max-h-60 py-2" : "max-h-0 py-0"
                      }`}
                    >
                      <div className="flex flex-col px-4  gap-1 ">
                        {navItem?.children?.map((cItem, idx) => (
                          <Link className="" href={cItem.href} key={idx}>
                            {cItem.cname}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link href={navItem.href}>{navItem.name}</Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
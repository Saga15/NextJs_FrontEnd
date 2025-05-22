import React, { useState, useEffect } from "react";
import { Card, Image, Accordion, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import Link from "next/link";
import menu from "../../../helper/menu";

export function Sidebar() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [activeSubMenuTab, setActiveSubMenuTab] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    setActiveSubMenuTab(null);
  }, [activeTab]);

  useEffect(() => {
    if (router?.asPath === "/") {
      setActiveTab(0);
      setActiveSubMenuTab(null);
    }
  }, [router]);

  return (
    <Card className="rounded-0 border-0 bg-primary vh-100 customSidebar">
      <Card.Body className="py-0">
        <div className="sidemenu-logo text-center mb-6 mt-5">
          <Button className="main-logo" variant="link">
            <Image src="/theme-logo.svg" alt="Site Logo" height={130} width={500}/>
          </Button>
        </div>

        <div className="profile">
          <Card className="text-center bg-transparent border-0">
            <Card.Body className="pb-0">
              <a
                href="mailto:emily-jonson@template.com"
                className="text-altlight fw-light h6 mb-0"
              >
                {/* emily-jonson@template.com */}
              </a>
            </Card.Body>
          </Card>
        </div>

        <div className="sideNavLinks mt-7">
          <Accordion defaultActiveKey={`${activeTab}`}>
            {menu?.map((element, index) => (
              <Accordion.Item
                eventKey={`${index}`}
                className="bg-transparent border-0"
                onClick={() => {
                  setActiveTab(index);
                }}
                key={index+ 1}
              >
                {element.submenu?.length ? (
                  <Accordion.Header
                    className={`rounded-pill overflow-hidden lh-1 ${
                      !element.submenu.length ? "no-icon" : ""
                    }`}
                    onClick={() => {
                      if (element.path !== "#") {
                        router.push(element.path);
                      }
                    }}
                  >
                    <Image
                      src={element?.icon}
                      alt={"icon"}
                      className="me-2"
                      width={24}
                      height={24}
                      loading="lazy"
                    />
                    {element.title}
                  </Accordion.Header>
                ) : (
                  <Button
                    className={`customButton text-white bg-transparent fw-light border-0 w-100 text-start ${
                      router.asPath.split("/").includes(element.path.split("/")[2])
                        ? "activeButton"
                        : ""
                    }`}
                    onClick={() => {
                      if (router.asPath === "/") {
                        return;
                      }
                      if (element.path !== "#") {
                        router.push(element.path);
                      }
                    }}
                  >
                    <Image
                      src={element.icon}
                      alt={"alt"}
                      className="me-2"
                    />
                    {element.title}
                  </Button>
                )}

                {element.submenu?.map((subElement, subIndex) => (
                  <Accordion.Body
                    className="py-0"
                    key={subIndex+1}
                    onClick={() => {
                      setActiveSubMenuTab(subIndex);
                    }}
                  >
                    <ul className="list-unstyled ms-8 mt-4">
                      <li className="mb-4">
                        <Link
                          href={subElement.path ?? "#"}
                          className={`text-activeBg h5 ${
                            activeTab === index && activeSubMenuTab === subIndex
                              ? "active-link"
                              : ""
                          }`}
                        >
                          {subElement.title}
                        </Link>
                      </li>
                    </ul>
                  </Accordion.Body>
                ))}
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Sidebar;

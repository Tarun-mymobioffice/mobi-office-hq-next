"use client";


import { Int_AccordionItem } from "@/models/types";
import React from "react";
import { Accordion } from "react-bootstrap";

interface Int_Props {
  ACCORDION_DATA: Int_AccordionItem[];
  TITLE: string;
}

const FaqPage = ({ ACCORDION_DATA = [], TITLE = "" }: Int_Props) => {
  return (
    <div className="d-flex justify-content-center">
      <div className="section w-100">
        <div className="section-header">
          <h1 className="text-start text-md-start heading text-dark">{TITLE}</h1>
        </div>
        <div className="section-content mt-4">
          <Accordion>
            {/* FAQS loop */}
            {ACCORDION_DATA.map(faq => (
              <Accordion.Item eventKey={"" + faq.id} key={faq.id}>
                <Accordion.Header>{faq.question}</Accordion.Header>
                <Accordion.Body>{faq.answer}</Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;

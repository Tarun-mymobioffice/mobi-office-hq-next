import { Int_TestimonialProps } from "@/models/types";
import Image from "next/image";

interface ClientCardsProps {
  clients: Int_TestimonialProps[];
}

export default function ClientCards({ clients }: ClientCardsProps) {
  // Destructure correctly
  return (
    <div className="row font-family-inter g-2">
      {clients?.map((client: Int_TestimonialProps, index: number) => (
        <div key={index} className="col-12 col-md-6 col-lg-4">
          <div className="border-radius-10 bg-white border-one border-gray-light h-100 w-100 d-flex flex-column gap-1">
            <div className="position-relative w-100">
              <Image src={client.mobileImage} alt={client.author} width={100} height={100} style={{ objectFit: "cover", height: "auto", width: "100%" }} />
            </div>

            <p className="text-gray font-size-14 mb-0 px-3 text-start">{client.content}</p>

            <h2 className="paragraph text-dark fw-bold px-3 text-start font-size-18">
              {client.author}, <span className="text-muted">{client.role}</span>
            </h2>
            <p className="text-muted text-start px-3 font-size-14" dangerouslySetInnerHTML={{ __html: client.company || "" }}></p>
          </div>
        </div>
      ))}
    </div>
  );
}

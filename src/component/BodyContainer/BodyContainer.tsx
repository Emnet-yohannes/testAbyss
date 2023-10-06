import React, { ReactNode } from "react";

type ArrowContainerProps = {
  children: ReactNode;
};

const ArrowContainer: React.FC<ArrowContainerProps> = ({ children }) => {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          width: "70px",
          backgroundColor: "#c6cfda",
          color: "white",
        }}
      >
        ^
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          width: "70px",
          backgroundColor: "#c6cfda",
          color: "white",
        }}
      >
        v
      </div>
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: 0,
          transform: "translateY(-50%)",
          textAlign: "center",
          height: "50px",
          width: "15px",
          backgroundColor: "#c6cfda",
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            justifyContent: "center",
          }}
        >
          &gt;
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          transform: "translateY(-50%)",
          textAlign: "center",
          height: "50px",
          width: "15px",
          backgroundColor: "#c6cfda",
          color: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          &lt;
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ArrowContainer;

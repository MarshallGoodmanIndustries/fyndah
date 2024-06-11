
import image from "./man.png";

function PotentialCustomerData() {
  return (
    <div className="flex items-center justify-center">
      <div className="font-extrabold text-left mb-[17rem]">
        <p className="ml-48 text-xl flex items-center justify-center mt-1 text-center font-extrabold mb-20">
          PAGE THAT SHOW THE CUSTOMER LEEAD WHICH HAS BEEN PAID FOR
        </p>
      </div>

      <div>
        <img className=" mt-48 rounded-full" src={image} alt="indivivdual avatar fro lead" />
        <p className=" text-lg font-bold">Name: Patrick Star</p>
        <p className="text-lg font-bold"> Phone: +2348161703387 </p>
        <p className="text-lg font-bold"> email: PatrickStar@gmail.com </p>
      </div>
    </div>
  );
}

export default PotentialCustomerData;

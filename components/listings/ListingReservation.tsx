import { Range } from "react-date-range";
import Calendar from "../inputs/Calendar";
import Button from "../Button";

interface ListingReservationProps {
   price: number;
   totalPrice: number;
   dateRange: Range;
   disabledDates: Date[];
   onSubmit: () => void;
   onChangeDate: (value: Range) => void;
   disabled?: boolean;
}
const ListingReservation: React.FC<ListingReservationProps> = ({ price, dateRange, totalPrice, onSubmit, onChangeDate, disabledDates, disabled }) => {
   return (
      <section className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
         <div className="flex items-center gap-1 p-4">
            <span className="text-2xl font-semibold">$ {price}</span>
            <span className="text-light text-neutral-600">night</span>
         </div>
         <hr />
         <Calendar value={dateRange} disabledDates={disabledDates} onChange={(value) => onChangeDate(value.selection)} />
         <hr />
         <div className="p-4">
            <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
         </div>
         <div className="p-4 flex items-center justify-between font-semibold text-lg">
            <span>Total</span>
            <span>$ {totalPrice}</span>
         </div>
      </section>
   );
};

export default ListingReservation;

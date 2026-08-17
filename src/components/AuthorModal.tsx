import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@litelens/design-system/atoms"
import type { FC } from "react"

const AUTHOR_URL = import.meta.env.VITE_APP_AUTHOR_URL

export const AuthorModal: FC = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <span className="cursor-pointer text-white italic hover:text-white/80">@gknguyen</span>
      </DialogTrigger>
      <DialogContent size="md" showCloseButton>
        <DialogHeader>
          <DialogTitle>Hey there! 👋</DialogTitle>
          <DialogDescription>Buy me a coffee if you love this project ❤️</DialogDescription>
        </DialogHeader>

        <div className="text-body flex flex-col gap-3">
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
            <div className="flex flex-col items-center">
              <img
                src={`${AUTHOR_URL}/assets/payments/momo.jpg`}
                alt="MOMO payment QR code"
                className="h-40 w-40 sm:h-50 sm:w-50"
              />
              <p className="text-caption pointer-events-none touch-none font-medium select-none">
                MOMO (VN Region)
              </p>
            </div>

            <div className="flex flex-col items-center">
              <img
                src={`${AUTHOR_URL}/assets/payments/paypal.jpeg`}
                alt="PayPal payment QR code"
                className="h-40 w-40 sm:h-50 sm:w-50"
              />
              <p className="text-caption pointer-events-none touch-none font-medium select-none">
                PayPal
              </p>
            </div>
          </div>

          <div className="text-center">
            Get to know more about me at{" "}
            <a
              href={AUTHOR_URL}
              target="_blank"
              rel="noreferrer"
              className="text-info underline hover:text-info/80"
            >
              gknguyen.info
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

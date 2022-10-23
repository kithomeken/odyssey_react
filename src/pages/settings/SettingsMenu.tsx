import { Helmet } from "react-helmet"
import React, { useState } from "react"

import Error404 from "../errors/Error404"
import Crypto from "../../encryption/Crypto"
import Loading from "../../components/layouts/Loading"
import { NotAuthorized } from "../errors/NotAuthorized"
import { CommsBreakdown } from "../errors/CommsBreakdown"
import StorageServices from "../../services/StorageServices"
import { accountRoutes } from "../../routes/settings/accountRoutes"
import { generalRoutes } from "../../routes/settings/generalRoutes"
import { HEADER_SECTION_BG, KEY_ACCOUNT_INFO } from "../../global/ConstantsRegistry"
import { Link } from "react-router-dom"

export const SettingsMenu = () => {
	const [state, setstate] = useState({
		status: 'fulfilled',
		statusCode: null,
		data: null
	})

	// Header button
	const pageTitle = "Settings"
	const maxWidth = { maxWidth: '1024px' }

	const enAccountInfo = StorageServices.getLocalStorage(KEY_ACCOUNT_INFO)
	const deAccountInfo = Crypto.decryptDataUsingAES256(enAccountInfo)
	const accountInfo = JSON.parse(deAccountInfo)

	const AGNT_ACCOUNT_RT: any = (accountRoutes.find((routeName) => routeName.name === 'AGNT'))?.path
    const ANNOUNCEMENTS: any = (generalRoutes.find((routeName) => routeName.name === 'ANNC'))?.path
    const PRODUCT_MANAGEMENT: any = (generalRoutes.find((routeName) => routeName.name === 'PROD'))?.path
    const COMPANY_GROUPS: any = (generalRoutes.find((routeName) => routeName.name === 'CMPNY'))?.path

	React.useEffect(() => {
		/*
		* TODO: Fetch the list of menus
		*  the user is eligible to see
		* */
	}, [])

	return (
		<React.Fragment>
			<Helmet>
				<title>{pageTitle}</title>
			</Helmet>

			<div className={`px-12 w-full ${HEADER_SECTION_BG} form-group mb-3 sttng_strp h-24`}>
				<div className="kiOAkj" style={maxWidth}>
					<div className="flex items-center pb-3 pt-3 lg:justify-between w-full">
						<div className="flex-1 min-w-0"></div>
					</div>
				</div>
			</div>

			<div className={`px-12 w-full form-group mb-3/`}>
				<div className="kiOAkj" style={maxWidth}>
					{
						state.status === 'rejected' ? (
							state.statusCode === 404 ? (
								<Error404 />
							) : state.statusCode === 403 ? (
								<NotAuthorized />
							) : (
								<CommsBreakdown />
							)
						) : state.status === 'fulfilled' ? (
							<div className="w-8/12 m-auto">
								<p className="text-3xl text-emerald-600 mb-3">
									Settings
								</p>

								<p className="text-lg text-slate-600 mb-3">
									Account Management
								</p>

								<div className="w-full flex flex-row align-middle pb-5">
									<Link to={AGNT_ACCOUNT_RT} className="w-3/12 m-auto">
										<div className="h-16 w-16 flex m-auto flex-row align-middle bg-emerald-100 mb-4 rounded-full">
											<span className="m-auto fal fa-user-circle fa-2x"></span>
										</div>

										<p className="text-sm m-auto text-center text-slate-700">
											Agent Accounts
										</p>
									</Link>

									<div className="w-3/12 m-auto">
										<div className="h-16 w-16 flex m-auto flex-row align-middle bg-emerald-100 mb-4 rounded-full">
											<span className="m-auto fal fa-user-crown fa-2x"></span>
										</div>

										<p className="text-sm m-auto text-center text-slate-700">
											Client Accounts
										</p>
									</div>

									<div className="w-6/12"></div>
								</div>

								<p className="text-lg text-slate-600 mb-3">
									General Settings
								</p>

								<div className="w-full flex flex-row align-middle pb-6">
									<Link to={PRODUCT_MANAGEMENT} className="w-3/12 m-auto">
										<div className="h-16 w-16 flex m-auto flex-row align-middle bg-emerald-100 mb-4 rounded-full">
											<span className="m-auto fal fa-box-full fa-2x"></span>
										</div>

										<p className="text-sm m-auto text-center text-slate-700">
											Product Management
										</p>
									</Link>

									<Link to={COMPANY_GROUPS} className="w-3/12 m-auto">
										<div className="h-16 w-16 flex m-auto flex-row align-middle bg-emerald-100 mb-4 rounded-full">
											<span className="m-auto fal fa-warehouse-alt fa-2x"></span>
										</div>

										<p className="text-sm m-auto text-center text-slate-700">
											Company Groups
										</p>
									</Link>

									<Link to={ANNOUNCEMENTS} className="w-3/12 m-auto">
										<div className="h-16 w-16 flex m-auto flex-row align-middle bg-emerald-100 mb-4 rounded-full">
											<span className="m-auto fal fa-megaphone fa-2x"></span>
										</div>

										<p className="text-sm m-auto text-center text-slate-700">
											Announcements
										</p>
									</Link>

									<div className="w-3/12 m-auto">
										<div className="h-16 w-16 flex m-auto flex-row align-middle bg-emerald-100 mb-4 rounded-full">
											<span className="m-auto fal fa-user-crown fa-2x"></span>
										</div>

										<p className="text-sm m-auto text-center text-slate-700">
											Escalation Matrix
										</p>
									</div>
								</div>

								<div className="w-full mb-4">
									<span className="relative cursor-pointer text-sm flex flex-row items-center text-blue-600 hover:text-blue-800 focus-within:outline-none focus-within:ring-0 focus-within:ring-offset-0">
										More Settings
										<span className="far fa-arrow-right ml-2"></span>
									</span>
								</div>

								{
									accountInfo.account_type === 'M' ? (
										<p className="text-lg text-slate-600 mb-3">
											Master Settings
										</p>
									) : null
								}
							</div>
						) : (
							<div className="py-5">
								<Loading />
							</div>
						)
					}
				</div>
			</div>
		</React.Fragment>
	)
} 
SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.5 (Ubuntu 15.5-1.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") FROM stdin;
\.


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."flow_state" ("id", "user_id", "auth_code", "code_challenge_method", "code_challenge", "provider_type", "provider_access_token", "provider_refresh_token", "created_at", "updated_at", "authentication_method") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") FROM stdin;
\.


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") FROM stdin;
\.


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."instances" ("id", "uuid", "raw_base_config", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag") FROM stdin;
\.


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") FROM stdin;
\.


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."mfa_factors" ("id", "user_id", "friendly_name", "factor_type", "status", "created_at", "updated_at", "secret") FROM stdin;
\.


--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."mfa_challenges" ("id", "factor_id", "created_at", "verified_at", "ip_address") FROM stdin;
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") FROM stdin;
\.


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."sso_providers" ("id", "resource_id", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."saml_providers" ("id", "sso_provider_id", "entity_id", "metadata_xml", "metadata_url", "attribute_mapping", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."saml_relay_states" ("id", "sso_provider_id", "request_id", "for_email", "redirect_to", "created_at", "updated_at", "flow_state_id") FROM stdin;
\.


--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."sso_domains" ("id", "sso_provider_id", "domain", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--

COPY "pgsodium"."key" ("id", "status", "created", "expires", "key_type", "key_id", "key_context", "name", "associated_data", "raw_key", "raw_key_nonce", "parent_key", "comment", "user_data") FROM stdin;
\.


--
-- Data for Name: Account; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Account" ("id", "userId", "createdAt", "mask", "account_id", "institution_id", "type", "subtype", "available_balance", "current_balance", "currency_code", "display_name", "official_name") FROM stdin;
10	1	2024-03-10 04:39:12.531	0000	wMnaebRLQJFg83xbWeKPT6edpGNx7gcPK7181	ins_39	depository	checking	100	110	CAD	Plaid Checking	Plaid Gold Standard 0% Interest Checking
11	1	2024-03-10 04:39:12.531	1111	5PKe14nDy6slj9JXaq3oHmLnAPweJGi5jPQmX	ins_39	depository	savings	200	210	CAD	Plaid Saving	Plaid Silver Standard 0.1% Interest Saving
12	1	2024-03-10 04:39:12.531	2222	JvglK4wZB9hxab81VGzvuBWn57yropiBwrePM	ins_39	depository	cd	\N	1000	CAD	Plaid CD	Plaid Bronze Standard 0.2% Interest CD
13	1	2024-03-10 04:39:12.531	3333	k3Z9rxMdzkSAjnGLry85Hb8X9rZqKEiLAV1v6	ins_39	credit	credit card	\N	410	CAD	Plaid Credit Card	Plaid Diamond 12.5% APR Interest Credit Card
14	1	2024-03-10 04:39:12.531	4444	lxMvz9maBdsmZrxRzXeLhrbW4koA6Mip6Xmx3	ins_39	depository	money market	43200	43200	CAD	Plaid Money Market	Plaid Platinum Standard 1.85% Interest Money Market
15	1	2024-03-10 04:39:12.531	5555	qPgrabJ749s4lpXjQ1VLFqA9Elkod6sgBDy3z	ins_39	investment	tfsa	\N	320.76	CAD	Plaid TFSA	\N
16	1	2024-03-10 04:39:12.531	6666	Kv8qr4AM3ZhL9wv7P4l8FWmg6r97bkfRrBDQv	ins_39	investment	rrsp	\N	23631.9805	CAD	Plaid RRSP	\N
17	1	2024-03-10 04:39:12.531	7777	rk8z4g7eN9FoWJyXlwnpTq6KQwv18zs7N5kz5	ins_39	loan	student	\N	65262	CAD	Plaid Student Loan	\N
18	1	2024-03-10 04:39:12.531	8888	zpyPEalgo9TdGlzgRKw1Fok49V1rEjfl6vXn9	ins_39	loan	mortgage	\N	56302.06	CAD	Plaid Mortgage	\N
19	1	2024-03-10 22:37:27.176	0016	rJdAexKwnKcqewVZR80kC9QranLQ13IVAJQAD	ins_38	credit	credit card	49981.23	330.09	CAD	Scotia Momentum VISA card	Scotia Momentum VISA card
20	1	2024-03-10 22:37:27.176	0527	0ARyPb5q35FP9Kz1OqNacYLkDRbLQ1HA5MY5z	ins_38	depository	checking	7559.62	6059.62	CAD	Ultimate Package	Ultimate Package
21	1	2024-03-10 22:37:27.176	3016	jbnemv0970h7amoZdq8nCEPAqykP5JHeYVpY6	ins_38	credit	credit card	2000	0	CAD	Scene+ Visa card	Scene+ Visa card
22	1	2024-03-10 22:37:27.176	6255	AyYwZpB5bBsYwPn7zX1OFQ34zBy3ZOUMBkLBK	ins_38	depository	savings	0.91	0.91	CAD	Momentum PLUS Savings	Momentum PLUS Savings
23	1	2024-03-10 22:37:27.176	8012	4re4yj7KA7cjdJyxXKwVCY8KRv78r5HRE0VEo	ins_38	loan	line of credit	48000	0	CAD	ScotiaLine Line of Credit	ScotiaLine Line of Credit
24	1	2024-03-10 22:37:27.176	8770	vLDJem51w5sKnRBEgrydUaXR6KqXdJUV7Ba7Z	ins_38	depository	savings	0	0	CAD	Momentum PLUS Savings	Momentum PLUS Savings
25	1	2024-03-10 23:46:51.458	7319	pLj8MwNM8BuV17zke63XUd4Rnzgrxvt3kzdgP	ins_42	credit	credit card	7932	0	CAD	TD BUSINESS CASH BACK VISA	TD Business Cash Back Visa
26	1	2024-03-10 23:46:51.458	7577	nwVjnYKnjPU5LQ3oeNg9fMmgdbnDvkSBeLxgP	ins_42	depository	checking	15917.77	15917.77	CAD	TD BASIC BUSINESS PLAN	TD Basic Business Plan Account
\.


--
-- Data for Name: Institution; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Institution" ("id", "institution_id", "name", "userId", "url", "logo", "access_token", "sync_cursor", "last_sync", "sync_job_key") FROM stdin;
3	ins_38	Scotiabank	1	\N	\N	access-development-8c1bad8f-2998-418d-83a3-e4bacc51e439	CAESJVJxZFFFNlAxRFBVRFJPTWRKalg5aFA5TndLbTF2VkllZ3FWalgaDAi07LivBhDQxK+fASIMCLTsuK8GENDEr58BKgwItOy4rwYQ0MSvnwE=	2024-03-10T23:24:47.030Z	\N
4	ins_42	TD Canada Trust	1	\N	\N	access-development-82293e9a-58aa-40df-b4e4-092f1a123f80	CAESJW1kbjBFWXlFMDFTcjZNRVlldjdCaGttOVJMYjRiVkhCNGQwbkQaDAjwjLmvBhDAzJCEASIMCPCMua8GEMDMkIQBKgwI8Iy5rwYQwMyQhAE=	2024-03-10T23:46:56.951Z	\N
\.


--
-- Data for Name: Transaction; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Transaction" ("id", "account_id", "transaction_id", "createdAt", "amount", "date", "name", "currency_code", "pending", "category", "deletedAt") FROM stdin;
99	0ARyPb5q35FP9Kz1OqNacYLkDRbLQ1HA5MY5z	96e70Kzj4zsQBqRdM6LXHaojdRZxqJTgAyMKZ	2024-03-10 22:37:32.721	-600	2024-03-09	DEPOSIT FREE INTERAC E-TRANSFER	CAD	f	TRANSFER_IN	\N
100	0ARyPb5q35FP9Kz1OqNacYLkDRbLQ1HA5MY5z	VKDdVyv3BvhBORXeoLZKhPO3JaLrjEH4RkpLm	2024-03-10 22:37:32.721	624	2024-03-09	Customer Transfer Dr. PC TO 4537373137600016	CAD	f	TRANSFER_OUT	\N
101	0ARyPb5q35FP9Kz1OqNacYLkDRbLQ1HA5MY5z	ODA9V5L6wLhwOb5zq4pXU65YJKr8g3Uxw4A3Y	2024-03-10 22:37:32.721	177.42	2024-03-06	Loans RBC LOAN PYMT	CAD	f	LOAN_PAYMENTS	\N
102	0ARyPb5q35FP9Kz1OqNacYLkDRbLQ1HA5MY5z	M6KoYrwdXwsYZM5Eb9p4FgDALQ05pOcX8PNVn	2024-03-10 22:37:32.721	382.92	2024-03-05	CRD. Card Bill Payment	CAD	f	LOAN_PAYMENTS	\N
103	0ARyPb5q35FP9Kz1OqNacYLkDRbLQ1HA5MY5z	EvL3g1A7VAivj9NVJQ7RTNmr4BVvnDCQgEAaj	2024-03-10 22:37:32.721	1053.8	2024-03-01	Investment Wealthsimple Investments Inc.	CAD	f	TRANSFER_OUT	\N
104	0ARyPb5q35FP9Kz1OqNacYLkDRbLQ1HA5MY5z	RqdQE6P1DPUDROMdJjX9hP95BAYKqmHeO1kRX	2024-03-10 22:37:32.721	365.37	2024-03-01	Miscellaneous Payment AWM ALLIANCE REAL ESTATE GROUP	CAD	f	RENT_AND_UTILITIES	\N
105	0ARyPb5q35FP9Kz1OqNacYLkDRbLQ1HA5MY5z	QP0EVw1DL1uLzwBak38VC8rMq5yE4nUONJKjp	2024-03-10 22:37:32.721	30.95	2024-02-29	Service Charge MONTHLY FEES	CAD	f	BANK_FEES	\N
106	0ARyPb5q35FP9Kz1OqNacYLkDRbLQ1HA5MY5z	nb71eRxEMxhL9YbDZ61jCx6LPZnrAbtBr7x4Y	2024-03-10 22:37:32.721	1453.27	2024-02-28	Mortgage Payment 2601144RBC PYT	CAD	f	LOAN_PAYMENTS	\N
107	0ARyPb5q35FP9Kz1OqNacYLkDRbLQ1HA5MY5z	pJ73e0YQRYc1XyEaoJYnUXaYBogkJzH3vadjO	2024-03-10 22:37:32.721	19.03	2024-02-28	Miscellaneous Payment PAYPAL	CAD	f	TRANSFER_OUT	\N
108	0ARyPb5q35FP9Kz1OqNacYLkDRbLQ1HA5MY5z	XAPDOB0Ky0FyYo8Pg1zdtYwxJzpQaDUdo6V8r	2024-03-10 22:37:32.721	177.42	2024-02-21	Loans RBC LOAN PYMT	CAD	f	LOAN_PAYMENTS	\N
109	0ARyPb5q35FP9Kz1OqNacYLkDRbLQ1HA5MY5z	NLkgVr6wd6sdzZQ395pESP7YgXzRr0HoZ3XrR	2024-03-10 22:37:32.721	-1453.27	2024-02-21	Miscellaneous Payment EQUITABLE BANK	CAD	f	TRANSFER_IN	\N
110	0ARyPb5q35FP9Kz1OqNacYLkDRbLQ1HA5MY5z	eJ7Vegv5ZvcZmzDJE3NpTYbK8N3XdxUnwaD1n	2024-03-10 22:37:32.721	-365.37	2024-02-19	Miscellaneous Payment EQUITABLE BANK	CAD	f	TRANSFER_IN	\N
111	0ARyPb5q35FP9Kz1OqNacYLkDRbLQ1HA5MY5z	YvqPV9xkKxiKnRvqemQwUNYneaXQAqCJ09a3z	2024-03-10 22:37:32.721	18.9	2024-02-19	POS Purchase GRAINS FISH NOODLES BURNA	CAD	f	FOOD_AND_DRINK	\N
112	0ARyPb5q35FP9Kz1OqNacYLkDRbLQ1HA5MY5z	zqB9evj31jU0nRBwdrVDCY6zaJybOPUvgKm3n	2024-03-10 22:37:32.721	58.23	2024-02-16	POS Purchase JOOJAK RESTAURANT LTD VANCO	CAD	f	FOOD_AND_DRINK	\N
113	0ARyPb5q35FP9Kz1OqNacYLkDRbLQ1HA5MY5z	mo7LearMOrc6Bx0PjA9NfmP61j4yMaSBVN0y3	2024-03-10 22:37:32.721	-1000	2024-02-12	DEPOSIT FREE INTERAC E-TRANSFER	CAD	f	TRANSFER_IN	\N
114	0ARyPb5q35FP9Kz1OqNacYLkDRbLQ1HA5MY5z	dRm7eA4Z84i8bOaR0AZmCAwB8ZndbDiKdDqj8	2024-03-10 22:37:32.721	15.5	2024-02-10	POS Purchase GRAINS FISH NOODLES BURNA	CAD	f	FOOD_AND_DRINK	\N
115	0ARyPb5q35FP9Kz1OqNacYLkDRbLQ1HA5MY5z	wD1ZYo9P69hk1jzOdrRwt6Op3dkvoNUKarEoM	2024-03-10 22:37:32.721	16.3	2024-02-10	POS Purchase GRAINS FISH NOODLES BURNA	CAD	f	FOOD_AND_DRINK	\N
116	0ARyPb5q35FP9Kz1OqNacYLkDRbLQ1HA5MY5z	6a48kzNA0NIbZy0Kon9kIjaOkzynr5Iw3YeLY	2024-03-10 22:37:32.721	-1700	2024-02-10	DEPOSIT FREE INTERAC E-TRANSFER	CAD	f	TRANSFER_IN	\N
117	jbnemv0970h7amoZdq8nCEPAqykP5JHeYVpY6	LwyZV0dQpdh6Z3n5kdNXfdw197Q0BzFZp8L4a	2024-03-10 22:37:32.721	-0.77	2024-03-04	CREDIT ADJUSTMENT	CAD	f	TRANSFER_IN	\N
118	jbnemv0970h7amoZdq8nCEPAqykP5JHeYVpY6	DA6qbnvg9vF8zaxrEApRCN5v7DA3RqCw8gN36	2024-03-10 22:37:32.721	0.79	2024-03-02	AWS	CAD	f	GENERAL_MERCHANDISE	\N
119	rJdAexKwnKcqewVZR80kC9QranLQ13IVAJQAD	1vRkqZNByNixbmyJwBAktKa6qPmoXnUnXAV86	2024-03-10 22:37:32.721	-382.92	2024-03-05	SCOTIABANK TRANSIT 82040 SURREY BC	CAD	f	TRANSFER_IN	\N
120	rJdAexKwnKcqewVZR80kC9QranLQ13IVAJQAD	P1vOVdDL6DF6oZXvj9Omfk7zgBQmAXuoZJy3r	2024-03-10 22:37:32.721	23.51	2024-03-05	Netflix	CAD	f	ENTERTAINMENT	\N
121	rJdAexKwnKcqewVZR80kC9QranLQ13IVAJQAD	qJEKejYdQYcPaARoy8OkcENR4ymAJPtDbnjv4	2024-03-10 22:37:32.721	139.41	2024-03-01	GITHUB, INC. HTTPSGITHUB.CCA AMT 100.00	CAD	f	GENERAL_SERVICES	\N
122	rJdAexKwnKcqewVZR80kC9QranLQ13IVAJQAD	BKdL5QEogEhPgRvOoKjec9Prq0xE7bi3ANDkk	2024-03-10 22:37:32.721	15.44	2024-02-29	GONG CHA NEW WESTMINSTBC (APPLE PAY)	CAD	f	FOOD_AND_DRINK	\N
123	rJdAexKwnKcqewVZR80kC9QranLQ13IVAJQAD	3mbj3xvykvHO5QnrayxkHAJ7neyXD3io9LvBV	2024-03-10 22:37:32.721	8.64	2024-02-26	NINJA BUBBLE TEA X POSurrey BC (APPLE PAY)	CAD	f	FOOD_AND_DRINK	\N
124	rJdAexKwnKcqewVZR80kC9QranLQ13IVAJQAD	yPqge3oBDouve0nd8pqLTzw7e8B1OJCp4azxA	2024-03-10 22:37:32.721	10.49	2024-02-26	Landmark Cinemas CA AB AB	CAD	f	ENTERTAINMENT	\N
125	rJdAexKwnKcqewVZR80kC9QranLQ13IVAJQAD	Kd3JXO5Rn5hjbRAPM6YNCPeKgRvzm8HEpNVnY	2024-03-10 22:37:32.721	6.09	2024-02-23	Hiel Cafe BURNABY BC (APPLE PAY)	CAD	f	FOOD_AND_DRINK	\N
126	rJdAexKwnKcqewVZR80kC9QranLQ13IVAJQAD	kZMzev0V90hzrmbZvjwMsKVm8vE0R6UoqEP6Z	2024-03-10 22:37:32.721	8.74	2024-02-23	BLENZ GUILDFORD VILLAGE SURREY BC (APPLE PAY)	CAD	f	TRANSPORTATION	\N
127	rJdAexKwnKcqewVZR80kC9QranLQ13IVAJQAD	AyYwZpB5bBsYwPn7zX1OFQ1aPb5mnYCM7jpY8	2024-03-10 22:37:32.721	90.45	2024-02-23	UMAMI RAMEN & CAFE SURREY BC (APPLE PAY)	CAD	f	FOOD_AND_DRINK	\N
128	rJdAexKwnKcqewVZR80kC9QranLQ13IVAJQAD	vLDJem51w5sKnRBEgrydUayeQgk4mYTVQgyXo	2024-03-10 22:37:32.721	8.51	2024-02-22	NINJA BUBBLE TEA GUILDFORSURREY BC (APPLE PAY)	CAD	f	FOOD_AND_DRINK	\N
129	rJdAexKwnKcqewVZR80kC9QranLQ13IVAJQAD	0ARyPb5q35FP9Kz1OqNacYNwMjoE6KUAbJ7yZ	2024-03-10 22:37:32.721	4.25	2024-02-18	ADV PARKING00529014H BC	CAD	f	TRANSPORTATION	\N
130	rJdAexKwnKcqewVZR80kC9QranLQ13IVAJQAD	jbnemv0970h7amoZdq8nCEnYpd4LD8teL3zA5	2024-03-10 22:37:32.721	14.56	2024-02-17	CRAFT CAFE NEW WESTMINSTBC (APPLE PAY)	CAD	f	FOOD_AND_DRINK	\N
131	rJdAexKwnKcqewVZR80kC9QranLQ13IVAJQAD	rJdAexKwnKcqewVZR80kC9AzyRYvBDiVvb9YO	2024-03-10 22:37:32.721	19.35	2024-02-12	McDonald's	CAD	f	FOOD_AND_DRINK	\N
132	rJdAexKwnKcqewVZR80kC9QranLQ13IVAJQAD	4re4yj7KA7cjdJyxXKwVCYDBzdZa41URXqLeV	2024-03-10 22:37:32.721	4.49	2024-02-09	McDonald's	CAD	f	FOOD_AND_DRINK	\N
133	rJdAexKwnKcqewVZR80kC9QranLQ13IVAJQAD	aJ08p1XxaXcNE7vxgQp3t0yxOed57MU784DRD	2024-03-10 22:37:32.721	26.37	2024-02-09	SUSHI SHOGUN SURREY BC	CAD	f	FOOD_AND_DRINK	\N
134	0ARyPb5q35FP9Kz1OqNacYLkDRbLQ1HA5MY5z	gJ7Reg9bo9coz0NXbdM7CDNe1gQJXwU8mKXjE	2024-03-10 23:24:46.511	177.42	2024-02-07	Loans RBC LOAN PYMT	CAD	f	LOAN_PAYMENTS	\N
135	0ARyPb5q35FP9Kz1OqNacYLkDRbLQ1HA5MY5z	7d45ANnvjnhZz4v5Ydn7TpnARbN3MDF0A53nB	2024-03-10 23:24:46.511	441.54	2024-02-02	CRD. Card Bill Payment	CAD	f	LOAN_PAYMENTS	\N
136	0ARyPb5q35FP9Kz1OqNacYLkDRbLQ1HA5MY5z	96e70Kzj4zsQBqRdM6LXHaok4xJOQgHgoxX90	2024-03-10 23:24:46.511	365.37	2024-02-01	Miscellaneous Payment AWM ALLIANCE REAL ESTATE GROUP	CAD	f	RENT_AND_UTILITIES	\N
137	0ARyPb5q35FP9Kz1OqNacYLkDRbLQ1HA5MY5z	VKDdVyv3BvhBORXeoLZKhPO9nrEke8I4KjOM1	2024-03-10 23:24:46.511	1453.27	2024-01-30	Mortgage Payment 2601116RBC PYT	CAD	f	LOAN_PAYMENTS	\N
138	0ARyPb5q35FP9Kz1OqNacYLkDRbLQ1HA5MY5z	ODA9V5L6wLhwOb5zq4pXU65Rz834ejUx9goOj	2024-03-10 23:24:46.511	19.03	2024-01-30	Miscellaneous Payment PAYPAL	CAD	f	TRANSFER_OUT	\N
139	0ARyPb5q35FP9Kz1OqNacYLkDRbLQ1HA5MY5z	M6KoYrwdXwsYZM5Eb9p4FgDRe5OPEYUXwpdKA	2024-03-10 23:24:46.511	31.75	2024-01-27	POS Purchase GRAINS FISH NOODLES BURNA	CAD	f	FOOD_AND_DRINK	\N
140	0ARyPb5q35FP9Kz1OqNacYLkDRbLQ1HA5MY5z	EvL3g1A7VAivj9NVJQ7RTNmw0vDELqtQNn6o9	2024-03-10 23:24:46.511	-25	2024-01-26	DEPOSIT FREE INTERAC E-TRANSFER	CAD	f	TRANSFER_IN	\N
141	0ARyPb5q35FP9Kz1OqNacYLkDRbLQ1HA5MY5z	RqdQE6P1DPUDROMdJjX9hP9NwKm1vVIegqVZk	2024-03-10 23:24:46.511	177.42	2024-01-24	Loans RBC LOAN PYMT	CAD	f	LOAN_PAYMENTS	\N
142	0ARyPb5q35FP9Kz1OqNacYLkDRbLQ1HA5MY5z	QP0EVw1DL1uLzwBak38VC8rKgEnJjVIOP4yxn	2024-03-10 23:24:46.511	-1453.27	2024-01-22	Miscellaneous Payment EQUITABLE BANK	CAD	f	TRANSFER_IN	\N
143	0ARyPb5q35FP9Kz1OqNacYLkDRbLQ1HA5MY5z	nb71eRxEMxhL9YbDZ61jCx67krbBzqUBVpQke	2024-03-10 23:24:46.511	-11.75	2024-01-15	DEPOSIT FREE INTERAC E-TRANSFER	CAD	f	TRANSFER_IN	\N
144	0ARyPb5q35FP9Kz1OqNacYLkDRbLQ1HA5MY5z	pJ73e0YQRYc1XyEaoJYnUXaQvkz396U3m4ewv	2024-03-10 23:24:46.511	177.42	2024-01-10	Loans RBC LOAN PYMT	CAD	f	LOAN_PAYMENTS	\N
145	0ARyPb5q35FP9Kz1OqNacYLkDRbLQ1HA5MY5z	XAPDOB0Ky0FyYo8Pg1zdtYwkEQD63eUdKarNR	2024-03-10 23:24:46.511	-20	2024-01-08	DEPOSIT FREE INTERAC E-TRANSFER	CAD	f	TRANSFER_IN	\N
146	0ARyPb5q35FP9Kz1OqNacYLkDRbLQ1HA5MY5z	NLkgVr6wd6sdzZQ395pESP7b1R03AyIo8LY6j	2024-03-10 23:24:46.511	31.75	2024-01-06	POS Purchase GRAINS FISH NOODLES BURNA	CAD	f	FOOD_AND_DRINK	\N
147	0ARyPb5q35FP9Kz1OqNacYLkDRbLQ1HA5MY5z	eJ7Vegv5ZvcZmzDJE3NpTYbRLXx0VvUnNbx3K	2024-03-10 23:24:46.511	102.97	2024-01-05	POS Purchase CHEF PIN RICHM	CAD	f	FOOD_AND_DRINK	\N
148	0ARyPb5q35FP9Kz1OqNacYLkDRbLQ1HA5MY5z	YvqPV9xkKxiKnRvqemQwUNY3vQq9kVtJEqeMO	2024-03-10 23:24:46.511	365.37	2024-01-02	Miscellaneous Payment AWM ALLIANCE REAL ESTATE GROUP	CAD	f	RENT_AND_UTILITIES	\N
149	0ARyPb5q35FP9Kz1OqNacYLkDRbLQ1HA5MY5z	zqB9evj31jU0nRBwdrVDCY6mEbPv3DUv5nAbD	2024-03-10 23:24:46.511	-200	2023-12-30	DEPOSIT FREE INTERAC E-TRANSFER	CAD	f	TRANSFER_IN	\N
150	0ARyPb5q35FP9Kz1OqNacYLkDRbLQ1HA5MY5z	mo7LearMOrc6Bx0PjA9NfmPOKyaBRrIBZvr11	2024-03-10 23:24:46.511	1453.27	2023-12-28	Mortgage Payment 2601127RBC PYT	CAD	f	LOAN_PAYMENTS	\N
151	0ARyPb5q35FP9Kz1OqNacYLkDRbLQ1HA5MY5z	dRm7eA4Z84i8bOaR0AZmCAw7edDopPuK4Q0a5	2024-03-10 23:24:46.511	177.42	2023-12-28	Loans RBC LOAN PYMT	CAD	f	LOAN_PAYMENTS	\N
152	0ARyPb5q35FP9Kz1OqNacYLkDRbLQ1HA5MY5z	wD1ZYo9P69hk1jzOdrRwt6O79vNKqyUKDvdB8	2024-03-10 23:24:46.511	19.03	2023-12-28	Miscellaneous Payment PAYPAL	CAD	f	TRANSFER_OUT	\N
153	0ARyPb5q35FP9Kz1OqNacYLkDRbLQ1HA5MY5z	6a48kzNA0NIbZy0Kon9kIjaRLn5MVvIwpN0X1	2024-03-10 23:24:46.511	1.6	2023-12-27	CRD. Card Bill Payment	CAD	f	LOAN_PAYMENTS	\N
154	0ARyPb5q35FP9Kz1OqNacYLkDRbLQ1HA5MY5z	LwyZV0dQpdh6Z3n5kdNXfdwOX0z8oPIZRBoX6	2024-03-10 23:24:46.511	1.6	2023-12-27	Customer Transfer Dr. PC TO 4537334258933016	CAD	f	TRANSFER_OUT	\N
155	0ARyPb5q35FP9Kz1OqNacYLkDRbLQ1HA5MY5z	DA6qbnvg9vF8zaxrEApRCN5dz3qgLKtwORYKj	2024-03-10 23:24:46.511	0.88	2023-12-27	Customer Transfer Dr. PC TO 4537373137600016	CAD	f	TRANSFER_OUT	\N
156	0ARyPb5q35FP9Kz1OqNacYLkDRbLQ1HA5MY5z	1vRkqZNByNixbmyJwBAktKaQ1onRjEcn6gbx5	2024-03-10 23:24:46.511	481	2023-12-27	Customer Transfer Dr. PC TO 4537373137600016	CAD	f	TRANSFER_OUT	\N
157	0ARyPb5q35FP9Kz1OqNacYLkDRbLQ1HA5MY5z	P1vOVdDL6DF6oZXvj9Omfk7O9mXJrVIobAwqB	2024-03-10 23:24:46.511	-800	2023-12-27	DEPOSIT FREE INTERAC E-TRANSFER	CAD	f	TRANSFER_IN	\N
158	0ARyPb5q35FP9Kz1OqNacYLkDRbLQ1HA5MY5z	qJEKejYdQYcPaARoy8OkcENXeAPDBLHDAEN6z	2024-03-10 23:24:46.511	-1453.27	2023-12-21	Miscellaneous Payment EQUITABLE BANK	CAD	f	TRANSFER_IN	\N
159	0ARyPb5q35FP9Kz1OqNacYLkDRbLQ1HA5MY5z	BKdL5QEogEhPgRvOoKjec9PBVEbNR5i3O74Zx	2024-03-10 23:24:46.511	90.13	2023-12-15	POS Purchase CHEF PIN RICHM	CAD	f	FOOD_AND_DRINK	\N
160	0ARyPb5q35FP9Kz1OqNacYLkDRbLQ1HA5MY5z	3mbj3xvykvHO5QnrayxkHAJQwX3ZoquoOADqD	2024-03-10 23:24:46.511	-40.5	2023-12-15	DEPOSIT FREE INTERAC E-TRANSFER	CAD	f	TRANSFER_IN	\N
161	0ARyPb5q35FP9Kz1OqNacYLkDRbLQ1HA5MY5z	yPqge3oBDouve0nd8pqLTzw3n1JpZ9CpJgXyO	2024-03-10 23:24:46.511	-20	2023-12-15	DEPOSIT FREE INTERAC E-TRANSFER	CAD	f	TRANSFER_IN	\N
162	0ARyPb5q35FP9Kz1OqNacYLkDRbLQ1HA5MY5z	Kd3JXO5Rn5hjbRAPM6YNCPenZz8NjXIEzmdgE	2024-03-10 23:24:46.511	-23	2023-12-15	DEPOSIT FREE INTERAC E-TRANSFER	CAD	f	TRANSFER_IN	\N
163	0ARyPb5q35FP9Kz1OqNacYLkDRbLQ1HA5MY5z	kZMzev0V90hzrmbZvjwMsKVY706aAgcoKv9Xb	2024-03-10 23:24:46.511	177.42	2023-12-13	Loans RBC LOAN PYMT	CAD	f	LOAN_PAYMENTS	\N
164	rJdAexKwnKcqewVZR80kC9QranLQ13IVAJQAD	0ARyPb5q35FP9Kz1OqNacYNdnEKm79UADveRZ	2024-03-10 23:24:46.511	23.51	2024-02-05	Netflix	CAD	f	ENTERTAINMENT	\N
165	rJdAexKwnKcqewVZR80kC9QranLQ13IVAJQAD	jbnemv0970h7amoZdq8nCEn9NL81wMHebjZa5	2024-03-10 23:24:46.511	10	2024-02-03	IMPARK00011357H BC	CAD	f	TRANSPORTATION	\N
166	rJdAexKwnKcqewVZR80kC9QranLQ13IVAJQAD	rJdAexKwnKcqewVZR80kC9Ag5vDVjEiVnwZkO	2024-03-10 23:24:46.511	15	2024-02-03	LEE'S DONUTS TRAILER Surrey BC (APPLE PAY)	CAD	f	FOOD_AND_DRINK	\N
167	rJdAexKwnKcqewVZR80kC9QranLQ13IVAJQAD	4re4yj7KA7cjdJyxXKwVCYDkma1jg9URZnAgV	2024-03-10 23:24:46.511	27.73	2024-02-03	EARLS ROBSON STREET Vancouver BC (APPLE PAY)	CAD	f	FOOD_AND_DRINK	\N
168	rJdAexKwnKcqewVZR80kC9QranLQ13IVAJQAD	aJ08p1XxaXcNE7vxgQp3t0yq85M4k1I7z1jND	2024-03-10 23:24:46.511	-441.54	2024-02-02	SCOTIABANK TRANSIT 82040 SURREY BC	CAD	f	TRANSFER_IN	\N
169	rJdAexKwnKcqewVZR80kC9QranLQ13IVAJQAD	x1PoeJBqLBFAzJ5OP7w6f6d9Q1vOAEUOVKRPD	2024-03-10 23:24:46.511	1.69	2024-02-02	DOLLARAMA #0954 SURREY BC (APPLE PAY)	CAD	f	GENERAL_MERCHANDISE	\N
170	rJdAexKwnKcqewVZR80kC9QranLQ13IVAJQAD	JmBaVbAEQAHKezrvAynRUOePVb9kjDhmx79Nw	2024-03-10 23:24:46.511	2.1	2024-02-01	DADS DONAIR SURREY BC (APPLE PAY)	CAD	f	FOOD_AND_DRINK	\N
171	rJdAexKwnKcqewVZR80kC9QranLQ13IVAJQAD	8w5bvR70r7h7JAvzbwg0C4gkYoDQL3IxAv1qd	2024-03-10 23:24:46.511	12.6	2024-02-01	DADS DONAIR SURREY BC (APPLE PAY)	CAD	f	FOOD_AND_DRINK	\N
172	rJdAexKwnKcqewVZR80kC9QranLQ13IVAJQAD	Z0mBVe3Ak3skXPdg5qZzteEo4RAvqpUbrk451	2024-03-10 23:24:46.511	10.4	2024-01-29	REXALL PHARMACY #7152 SURREY BC (APPLE PAY)	CAD	f	MEDICAL	\N
173	rJdAexKwnKcqewVZR80kC9QranLQ13IVAJQAD	54OxK5ekves6wnQyzkJvf01nmyPrjQIwQ4DYv	2024-03-10 23:24:46.511	6.7	2024-01-26	McDonald's	CAD	f	FOOD_AND_DRINK	\N
174	rJdAexKwnKcqewVZR80kC9QranLQ13IVAJQAD	oJXqeBVREVcDnbQBqOoxhzjJevo4R9C4LbJVN	2024-03-10 23:24:46.511	10.49	2024-01-26	Landmark Cinemas CA AB AB	CAD	f	ENTERTAINMENT	\N
175	rJdAexKwnKcqewVZR80kC9QranLQ13IVAJQAD	bnR5e1vJxvsxXnwN34gRtKXV7dv90bcJOD6Z3	2024-03-10 23:24:46.511	14.69	2024-01-26	KING GEORGE DONAIR SURREY BC (APPLE PAY)	CAD	f	TRAVEL	\N
176	rJdAexKwnKcqewVZR80kC9QranLQ13IVAJQAD	gJ7Reg9bo9coz0NXbdM7CDNe1gQJXwU8mKXYk	2024-03-10 23:24:46.511	5.72	2024-01-22	TAKE FIVE CAFE SURREY BC (APPLE PAY)	CAD	f	FOOD_AND_DRINK	\N
177	rJdAexKwnKcqewVZR80kC9QranLQ13IVAJQAD	7d45ANnvjnhZz4v5Ydn7TpnARbN3MDF0A536n	2024-03-10 23:24:46.511	9.39	2024-01-22	McDonald's	CAD	f	FOOD_AND_DRINK	\N
178	rJdAexKwnKcqewVZR80kC9QranLQ13IVAJQAD	96e70Kzj4zsQBqRdM6LXHaok4xJOQgHgoxXZZ	2024-03-10 23:24:46.511	18.99	2024-01-21	McDonald's	CAD	f	FOOD_AND_DRINK	\N
179	rJdAexKwnKcqewVZR80kC9QranLQ13IVAJQAD	VKDdVyv3BvhBORXeoLZKhPO9nrEke8I4KjOom	2024-03-10 23:24:46.511	8.84	2024-01-20	TREES CHEESECAKE & COFFEESURREY BC	CAD	f	FOOD_AND_DRINK	\N
180	rJdAexKwnKcqewVZR80kC9QranLQ13IVAJQAD	ODA9V5L6wLhwOb5zq4pXU65Rz834ejUx9gomY	2024-03-10 23:24:46.511	18.59	2024-01-14	Chipotle Mexican Grill	CAD	f	FOOD_AND_DRINK	\N
181	rJdAexKwnKcqewVZR80kC9QranLQ13IVAJQAD	M6KoYrwdXwsYZM5Eb9p4FgDRe5OPEYUXwpdzn	2024-03-10 23:24:46.511	19.13	2024-01-14	DDUMAMIRAMENGRILL DOWNTOWN TOROON	CAD	f	FOOD_AND_DRINK	\N
182	rJdAexKwnKcqewVZR80kC9QranLQ13IVAJQAD	EvL3g1A7VAivj9NVJQ7RTNmw0vDELqtQNn6Xj	2024-03-10 23:24:46.511	100.83	2024-01-13	SURREY PARKS, REC AND CULSURREY BC	CAD	f	ENTERTAINMENT	\N
183	rJdAexKwnKcqewVZR80kC9QranLQ13IVAJQAD	RqdQE6P1DPUDROMdJjX9hP9NwKm1vVIegqVjX	2024-03-10 23:24:46.511	16.31	2024-01-11	KING GEORGE DONAIR SURREY BC (APPLE PAY)	CAD	f	TRAVEL	\N
184	nwVjnYKnjPU5LQ3oeNg9fMmgdbnDvkSBeLxgP	zApVMKNMV4hq047Ny3xnINYPvavxeDHv5nOJX	2024-03-10 23:46:56.508	1000	2024-02-12	SEND E-TFR ***eJB	CAD	f	TRANSFER_OUT	\N
185	nwVjnYKnjPU5LQ3oeNg9fMmgdbnDvkSBeLxgP	mdn0EYyE01Sr6MEYev7BhkmaB1Bo5rFBZvMeo	2024-03-10 23:46:56.508	1.5	2024-02-12	SEND E-TFR FEE	CAD	f	BANK_FEES	\N
186	nwVjnYKnjPU5LQ3oeNg9fMmgdbnDvkSBeLxgP	d5VPpYwpPEfY8zP57DjbI3ADo8oKqPUK4QbNA	2024-03-10 23:46:56.508	4.32	2024-02-20	CANADA TXD	CAD	f	LOAN_PAYMENTS	\N
187	nwVjnYKnjPU5LQ3oeNg9fMmgdbnDvkSBeLxgP	wyO8MBNM80u8kVPxqn91hP6NK3K1xytKDvL3j	2024-03-10 23:46:56.508	3000	2024-02-22	GC 9275-CASH WITHDRA	CAD	f	TRANSFER_OUT	\N
188	nwVjnYKnjPU5LQ3oeNg9fMmgdbnDvkSBeLxgP	6VmKJqdJK5Sab8drDjJZC4j5MkM7QvtwpNajD	2024-03-10 23:46:56.508	5	2024-02-29	MONTHLY PLAN FEE	CAD	f	GENERAL_SERVICES	\N
189	nwVjnYKnjPU5LQ3oeNg9fMmgdbnDvkSBeLxgP	Loajr9krj3H768ezYErZC5dz898k4PSZRB0xY	2024-03-10 23:46:56.508	3000	2024-03-04	GC 9275-CASH WITHDRA	CAD	f	TRANSFER_OUT	\N
190	nwVjnYKnjPU5LQ3oeNg9fMmgdbnDvkSBeLxgP	DoNB3JX3BwHD89oMQOezseNqg7g81KTwORZ6Y	2024-03-10 23:46:56.508	38820.26	2024-03-04	CAD DRAFT 07946305	CAD	f	TRANSFER_OUT	\N
191	pLj8MwNM8BuV17zke63XUd4Rnzgrxvt3kzdgP	1EePj65jPaT1xOgL0KqbUeKnRqRkMETn6gm4m	2024-03-10 23:46:56.508	-100	2024-03-10	CANCO PETROLEUM #192 S	CAD	t	TRANSPORTATION	\N
192	pLj8MwNM8BuV17zke63XUd4Rnzgrxvt3kzdgP	Po9nJY5JnAHB6NzdKn5oHLkXJgJo0VFobAmKo	2024-03-10 23:46:56.508	66.83	2024-03-10	CANCO PETROLEUM #192 S	CAD	t	TRANSPORTATION	\N
193	pLj8MwNM8BuV17zke63XUd4Rnzgrxvt3kzdgP	qDv8M6yM83TKPrN97dnaI9EPD4D1QLhDAEJk1	2024-03-10 23:46:56.508	100	2024-03-10	CANCO PETROLEUM #192 S	CAD	t	TRANSPORTATION	\N
194	pLj8MwNM8BuV17zke63XUd4Rnzgrxvt3kzdgP	Bp8PqaZqPncaPXAm0LZgCQ9bNqNMy5S3O79L7	2024-03-10 23:46:56.508	40	2024-03-08	7-Eleven	CAD	f	GENERAL_MERCHANDISE	\N
195	pLj8MwNM8BuV17zke63XUd4Rnzgrxvt3kzdgP	3V8B4DZ4BJSBOX9N4Aq5HRA3ZnZp6qFoOAKx7	2024-03-10 23:46:56.508	6.56	2024-03-05	INTEREST CHARGE -PURCHASE	CAD	f	BANK_FEES	\N
196	pLj8MwNM8BuV17zke63XUd4Rnzgrxvt3kzdgP	yk98MyNM8rfjvzV5oBaet5zJpep6Q9SpJgOMD	2024-03-10 23:46:56.508	22.57	2024-02-28	VANCOUVER INTERNATIONAL A	CAD	f	TRANSFER_OUT	\N
197	pLj8MwNM8BuV17zke63XUd4Rnzgrxvt3kzdgP	Koa0j7Ej0BH5j81qELzbfOP8NgNqQXcEzmQXv	2024-03-10 23:46:56.508	13.87	2024-02-26	NGROK N66NDTL6O46-0003	CAD	f	FOOD_AND_DRINK	\N
198	pLj8MwNM8BuV17zke63XUd4Rnzgrxvt3kzdgP	kXnAEYBEALTgzVJQY6PrtwK6a8azkgioKvRjE	2024-03-10 23:46:56.508	1.75	2024-02-20	NW PARKING MOBILE PAYM	CAD	f	TRANSPORTATION	\N
199	pLj8MwNM8BuV17zke63XUd4Rnzgrxvt3kzdgP	AVE1P47P1QSeYAyLgmEwFwQYjPjDRLiMOn69Q	2024-03-10 23:46:56.508	6.3	2024-02-20	PAYBYPHONE BURNABY	CAD	f	TRANSPORTATION	\N
200	nwVjnYKnjPU5LQ3oeNg9fMmgdbnDvkSBeLxgP	6VmKJqdJK5Sab8drDjJZC4jgVeByBKIw96eRM	2024-03-10 23:46:56.508	5	2023-12-29	MONTHLY PLAN FEE	CAD	f	GENERAL_SERVICES	\N
201	nwVjnYKnjPU5LQ3oeNg9fMmgdbnDvkSBeLxgP	Loajr9krj3H768ezYErZC5dMoErQrKtZPYLgb	2024-03-10 23:46:56.508	-9205.88	2024-01-04	MOBILE DEPOSIT	CAD	f	TRANSFER_IN	\N
202	nwVjnYKnjPU5LQ3oeNg9fMmgdbnDvkSBeLxgP	DoNB3JX3BwHD89oMQOezseNMLO6A6JHwqoNb4	2024-03-10 23:46:56.508	3000	2024-01-11	GC 9275-CASH WITHDRA	CAD	f	TRANSFER_OUT	\N
203	nwVjnYKnjPU5LQ3oeNg9fMmgdbnDvkSBeLxgP	1EePj65jPaT1xOgL0KqbUeKVj3JmJZHnq1VNv	2024-03-10 23:46:56.508	485.35	2024-01-29	RX151 TFR-TO C/C	CAD	f	TRANSFER_OUT	\N
204	nwVjnYKnjPU5LQ3oeNg9fMmgdbnDvkSBeLxgP	Po9nJY5JnAHB6NzdKn5oHLkDrn3Q3qUo7MyPz	2024-03-10 23:46:56.508	5	2024-01-31	MONTHLY PLAN FEE	CAD	f	GENERAL_SERVICES	\N
205	nwVjnYKnjPU5LQ3oeNg9fMmgdbnDvkSBeLxgP	qDv8M6yM83TKPrN97dnaI9E7BYOmOzHDrajpj	2024-03-10 23:46:56.508	1575.73	2024-02-05	CANADA TXD	CAD	f	LOAN_PAYMENTS	\N
206	pLj8MwNM8BuV17zke63XUd4Rnzgrxvt3kzdgP	5z8ymP7myZS16XqRb0dwU30YjAbpbaHwdLp87	2024-03-10 23:46:56.508	6.3	2024-02-05	PAYBYPHONE BURNABY	CAD	f	TRANSPORTATION	\N
207	pLj8MwNM8BuV17zke63XUd4Rnzgrxvt3kzdgP	o6vOYdgYOmigDre376Rnt1zwRnDKDgU4kazqa	2024-03-10 23:46:56.508	62.92	2024-02-01	CHV43108 QUEENS PARK O	CAD	f	TRANSPORTATION	\N
208	pLj8MwNM8BuV17zke63XUd4Rnzgrxvt3kzdgP	bgXDQYBQDOS7x08LVjyXCRKy05Y4Y1IJdAQ36	2024-03-10 23:46:56.508	-485.35	2024-01-30	PAYMENT - THANK YOU	CAD	f	LOAN_PAYMENTS	\N
209	pLj8MwNM8BuV17zke63XUd4Rnzgrxvt3kzdgP	gMV3EYDE3nUpoQJEe8qziODAX5bob4h8bZpPq	2024-03-10 23:46:56.508	13.87	2024-01-26	NGROK N66NDTL6O46-0002	CAD	f	FOOD_AND_DRINK	\N
210	pLj8MwNM8BuV17zke63XUd4Rnzgrxvt3kzdgP	7Vbk8Bw8koS6Z8Ox1rJzckp4MKPxPdH0zO9X0	2024-03-10 23:46:56.508	20	2024-01-22	CHARGEPOINT CANADA	CAD	f	TRANSPORTATION	\N
211	pLj8MwNM8BuV17zke63XUd4Rnzgrxvt3kzdgP	9Omv5yL5vgHOQ7beNaDBH3a7Qr1Z1NHgraME6	2024-03-10 23:46:56.508	2.5	2024-01-16	IMPARK00012221U	CAD	f	TRANSPORTATION	\N
212	pLj8MwNM8BuV17zke63XUd4Rnzgrxvt3kzdgP	V59nEY1Enaf8BNy1r5YOhmPKedzLzMs4aQpgj	2024-03-10 23:46:56.508	53.54	2024-01-15	SUPER SAVE GAS #17	CAD	f	TRANSPORTATION	\N
213	pLj8MwNM8BuV17zke63XUd4Rnzgrxvt3kzdgP	OomnxYaxnkHmw9K0QAZOIQ6neADrDOsxNMAEV	2024-03-10 23:46:56.508	20	2024-01-08	CHARGEPOINT CANADA	CAD	f	TRANSPORTATION	\N
214	pLj8MwNM8BuV17zke63XUd4Rnzgrxvt3kzdgP	MEOn4VQ4nyTQYeVjOBDZC9gdEoJ0JKHXkQNrB	2024-03-10 23:46:56.508	61.63	2024-01-08	7-Eleven	CAD	f	GENERAL_MERCHANDISE	\N
215	pLj8MwNM8BuV17zke63XUd4Rnzgrxvt3kzdgP	Eoamy8Zym6HBvnqg1YbjHONbLY5V5MhQ5wAR5	2024-03-10 23:46:56.508	5.58	2024-01-05	INTEREST CHARGE -PURCHASE	CAD	f	BANK_FEES	\N
216	pLj8MwNM8BuV17zke63XUd4Rnzgrxvt3kzdgP	Ro9nZYwZn0HADN0b38ZRHXPRv8zYzZfed8k71	2024-03-10 23:46:56.508	48.16	2024-01-05	Amazon	CAD	f	GENERAL_MERCHANDISE	\N
217	pLj8MwNM8BuV17zke63XUd4Rnzgrxvt3kzdgP	QomX8Yd8XvH5LEDxJRyzfA8ejRZyZPhObkK1M	2024-03-10 23:46:56.508	15.67	2024-01-05	Amazon	CAD	f	GENERAL_MERCHANDISE	\N
218	pLj8MwNM8BuV17zke63XUd4Rnzgrxvt3kzdgP	nwVjnYKnjPU5LQ3oeNg9fMx5zm1n18uBq8xZa	2024-03-10 23:46:56.508	122.91	2024-01-02	UMAMI RAMEN & GRILL	CAD	f	FOOD_AND_DRINK	\N
219	pLj8MwNM8BuV17zke63XUd4Rnzgrxvt3kzdgP	pLj8MwNM8BuV17zke63XUdXp94ZgZAU3QOdom	2024-03-10 23:46:56.508	60.45	2023-12-27	7-Eleven	CAD	f	GENERAL_MERCHANDISE	\N
220	pLj8MwNM8BuV17zke63XUd4Rnzgrxvt3kzdgP	X59nEYqEnJfAyNr9bknYHmYO3MApANsdP7Vgk	2024-03-10 23:46:56.508	10	2023-12-22	CHARGEPOINT CANADA	CAD	f	TRANSPORTATION	\N
221	pLj8MwNM8BuV17zke63XUd4Rnzgrxvt3kzdgP	No9naO5anKHXdNbqPJVzImPwAJQzQ6sobKXDn	2024-03-10 23:46:56.508	13.74	2023-12-20	NGROK N66NDTL6O46-0001	CAD	f	FOOD_AND_DRINK	\N
222	pLj8MwNM8BuV17zke63XUd4Rnzgrxvt3kzdgP	ezmqpY6pqRSjZVa0exbmtJYoV5a3aMtnejDO1	2024-03-10 23:46:56.508	10	2023-12-18	CHARGEPOINT CANADA	CAD	f	TRANSPORTATION	\N
223	pLj8MwNM8BuV17zke63XUd4Rnzgrxvt3kzdgP	YQRnEYBEn8tgKJP1x3YntBNKk54X4MUJpraON	2024-03-10 23:46:56.508	62.52	2023-12-15	CHV43023 GUILDFORD CHE	CAD	f	TRANSPORTATION	\N
224	pLj8MwNM8BuV17zke63XUd4Rnzgrxvt3kzdgP	zApVMKNMV4hq047Ny3xnINYr3w5y51HvB4mrL	2024-03-10 23:46:56.508	56.08	2023-12-11	1PASSWORD	CAD	f	GENERAL_SERVICES	\N
225	pLj8MwNM8BuV17zke63XUd4Rnzgrxvt3kzdgP	mdn0EYyE01Sr6MEYev7Bhkm9RLb4bVHB4d0nD	2024-03-10 23:46:56.508	64.77	2023-12-11	BROADWAY ESSO 37883	CAD	f	TRANSPORTATION	\N
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."User" ("id", "clerkId", "createdAt") FROM stdin;
1	user_2ctNt7zkWMPb0q14tdJ9d5wTNFK	2024-03-10 00:13:36.255
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."_prisma_migrations" ("id", "checksum", "finished_at", "migration_name", "logs", "rolled_back_at", "started_at", "applied_steps_count") FROM stdin;
cfc33b67-0b9c-42ca-b8d7-ac1dbb59dd95	dcf56cbdd39946d185ecf7295e74a17a28ed7d3f5144ad9de3f854821d817e10	2024-03-10 00:08:08.49856+00	20240310000807_pp_core	\N	\N	2024-03-10 00:08:07.958629+00	1
\.


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id") FROM stdin;
\.


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."objects" ("id", "bucket_id", "name", "owner", "created_at", "updated_at", "last_accessed_at", "metadata", "version", "owner_id") FROM stdin;
\.


--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--

COPY "vault"."secrets" ("id", "name", "description", "secret", "key_id", "nonce", "created_at", "updated_at") FROM stdin;
\.


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 1, false);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- Name: Account_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."Account_id_seq"', 26, true);


--
-- Name: Institution_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."Institution_id_seq"', 4, true);


--
-- Name: Transaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."Transaction_id_seq"', 225, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."User_id_seq"', 1, true);


--
-- PostgreSQL database dump complete
--

RESET ALL;

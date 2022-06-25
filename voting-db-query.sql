--
-- PostgreSQL database dump
--

-- Dumped from database version 13.6
-- Dumped by pg_dump version 13.6

-- Started on 2022-06-25 19:46:31 IST

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

DROP DATABASE votedb;
--
-- TOC entry 3326 (class 1262 OID 16807)
-- Name: votedb; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE votedb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';


\connect votedb

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
-- TOC entry 3 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- TOC entry 3327 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 200 (class 1259 OID 16808)
-- Name: area_codes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.area_codes (
    area_code_id bigint NOT NULL,
    area_code_name character varying
);


--
-- TOC entry 202 (class 1259 OID 16818)
-- Name: candidate; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.candidate (
    candidate_id bigint NOT NULL,
    candidate_fname character varying,
    candidate_lname character varying,
    candidate_age integer,
    candidate_area_code_id bigint,
    candidate_phone character varying,
    candidate_address text,
    candidate_username character varying,
    candidate_password character varying,
    candidate_party_id bigint,
    candidate_sex character(1),
    is_eligible boolean
);


--
-- TOC entry 201 (class 1259 OID 16816)
-- Name: candidate_candidate_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.candidate_candidate_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3328 (class 0 OID 0)
-- Dependencies: 201
-- Name: candidate_candidate_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.candidate_candidate_id_seq OWNED BY public.candidate.candidate_id;


--
-- TOC entry 211 (class 1259 OID 16979)
-- Name: election_record; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.election_record (
    record_id bigint NOT NULL,
    start_time timestamp without time zone,
    end_time timestamp without time zone,
    is_active boolean
);


--
-- TOC entry 210 (class 1259 OID 16977)
-- Name: election_record_record_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.election_record_record_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3329 (class 0 OID 0)
-- Dependencies: 210
-- Name: election_record_record_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.election_record_record_id_seq OWNED BY public.election_record.record_id;


--
-- TOC entry 203 (class 1259 OID 16833)
-- Name: party; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.party (
    party_id bigint NOT NULL,
    party_name character varying
);


--
-- TOC entry 205 (class 1259 OID 16938)
-- Name: voter; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.voter (
    voter_id bigint NOT NULL,
    voter_fname character varying,
    voter_lname character varying,
    voter_age integer,
    voter_sex character(1),
    voter_area_code_id bigint,
    voter_phone character varying,
    voter_address text,
    voter_username character varying,
    voter_password character varying,
    has_voted boolean DEFAULT false,
    allow_vote boolean
);


--
-- TOC entry 204 (class 1259 OID 16936)
-- Name: voter_voter_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.voter_voter_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3330 (class 0 OID 0)
-- Dependencies: 204
-- Name: voter_voter_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.voter_voter_id_seq OWNED BY public.voter.voter_id;


--
-- TOC entry 209 (class 1259 OID 16958)
-- Name: voting_record; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.voting_record (
    vote_id bigint NOT NULL,
    time_of_vote timestamp without time zone NOT NULL,
    voter_id bigint NOT NULL,
    candidate_id bigint NOT NULL,
    record_id bigint NOT NULL
);


--
-- TOC entry 208 (class 1259 OID 16956)
-- Name: voting_record_candidate_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.voting_record_candidate_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3331 (class 0 OID 0)
-- Dependencies: 208
-- Name: voting_record_candidate_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.voting_record_candidate_id_seq OWNED BY public.voting_record.candidate_id;


--
-- TOC entry 212 (class 1259 OID 16985)
-- Name: voting_record_record_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.voting_record_record_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3332 (class 0 OID 0)
-- Dependencies: 212
-- Name: voting_record_record_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.voting_record_record_id_seq OWNED BY public.voting_record.record_id;


--
-- TOC entry 206 (class 1259 OID 16952)
-- Name: voting_record_vote_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.voting_record_vote_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3333 (class 0 OID 0)
-- Dependencies: 206
-- Name: voting_record_vote_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.voting_record_vote_id_seq OWNED BY public.voting_record.vote_id;


--
-- TOC entry 207 (class 1259 OID 16954)
-- Name: voting_record_voter_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.voting_record_voter_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3334 (class 0 OID 0)
-- Dependencies: 207
-- Name: voting_record_voter_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.voting_record_voter_id_seq OWNED BY public.voting_record.voter_id;


--
-- TOC entry 3151 (class 2604 OID 16821)
-- Name: candidate candidate_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.candidate ALTER COLUMN candidate_id SET DEFAULT nextval('public.candidate_candidate_id_seq'::regclass);


--
-- TOC entry 3158 (class 2604 OID 16982)
-- Name: election_record record_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.election_record ALTER COLUMN record_id SET DEFAULT nextval('public.election_record_record_id_seq'::regclass);


--
-- TOC entry 3152 (class 2604 OID 16941)
-- Name: voter voter_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.voter ALTER COLUMN voter_id SET DEFAULT nextval('public.voter_voter_id_seq'::regclass);


--
-- TOC entry 3154 (class 2604 OID 16961)
-- Name: voting_record vote_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.voting_record ALTER COLUMN vote_id SET DEFAULT nextval('public.voting_record_vote_id_seq'::regclass);


--
-- TOC entry 3155 (class 2604 OID 16962)
-- Name: voting_record voter_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.voting_record ALTER COLUMN voter_id SET DEFAULT nextval('public.voting_record_voter_id_seq'::regclass);


--
-- TOC entry 3156 (class 2604 OID 16963)
-- Name: voting_record candidate_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.voting_record ALTER COLUMN candidate_id SET DEFAULT nextval('public.voting_record_candidate_id_seq'::regclass);


--
-- TOC entry 3157 (class 2604 OID 16987)
-- Name: voting_record record_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.voting_record ALTER COLUMN record_id SET DEFAULT nextval('public.voting_record_record_id_seq'::regclass);


--
-- TOC entry 3308 (class 0 OID 16808)
-- Dependencies: 200
-- Data for Name: area_codes; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.area_codes VALUES (1, 'AA11');
INSERT INTO public.area_codes VALUES (2, 'BB22');
INSERT INTO public.area_codes VALUES (3, 'CC33');
INSERT INTO public.area_codes VALUES (4, 'DD44');
INSERT INTO public.area_codes VALUES (5, 'EE55');
INSERT INTO public.area_codes VALUES (6, 'FF66');
INSERT INTO public.area_codes VALUES (7, 'GG77');
INSERT INTO public.area_codes VALUES (8, 'HH88');
INSERT INTO public.area_codes VALUES (9, 'II99');


--
-- TOC entry 3310 (class 0 OID 16818)
-- Dependencies: 202
-- Data for Name: candidate; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.candidate VALUES (6, 'Giovanbattista', 'Vedrana', 57, 2, '', '', NULL, NULL, 2, 'M', true);
INSERT INTO public.candidate VALUES (7, 'Meginhard', 'Lina', 53, 2, '', '', NULL, NULL, 3, 'F', true);
INSERT INTO public.candidate VALUES (8, 'Jian', 'Matylda', 71, 2, '', '', NULL, NULL, 1, 'M', true);
INSERT INTO public.candidate VALUES (9, 'Vinayak', 'Jaiwant', 23, 2, '9482331581 ', 'Belagavi', NULL, NULL, 1, 'M', true);
INSERT INTO public.candidate VALUES (10, 'Tejas', 'Jaiwant', 21, 4, '+919482331581', 'Plot No.154, Near Jain Heritage School, 1st Phase,
Rani Chenamma Nagar, Belagavi 590008', NULL, NULL, 5, 'M', true);
INSERT INTO public.candidate VALUES (11, 'tovino', 'Ganesh', 78, 5, '6364063669', 'Girls hostel, opposite Kle dr ms sheshgiri college, udtambagh, belgaum', NULL, NULL, 6, 'M', true);


--
-- TOC entry 3319 (class 0 OID 16979)
-- Dependencies: 211
-- Data for Name: election_record; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.election_record VALUES (1, '2022-06-25 18:40:35.894', '2022-06-25 18:43:43.925', false);


--
-- TOC entry 3311 (class 0 OID 16833)
-- Dependencies: 203
-- Data for Name: party; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.party VALUES (1, 'BJP');
INSERT INTO public.party VALUES (2, 'Congress');
INSERT INTO public.party VALUES (3, 'AAP');
INSERT INTO public.party VALUES (4, 'TMC');
INSERT INTO public.party VALUES (5, 'AIADMK');
INSERT INTO public.party VALUES (6, 'DMK');


--
-- TOC entry 3313 (class 0 OID 16938)
-- Dependencies: 205
-- Data for Name: voter; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.voter VALUES (9, 'Anirudh', 'Rao', 21, 'M', 4, '+919482331581', 'Plot No.154, Near Jain Heritage School, 1st Phase,
Rani Chenamma Nagar, Belagavi 590008', 'jklm', '1234', true, false);
INSERT INTO public.voter VALUES (3, 'Aramis ', 'Spartacus', 43, 'M', 2, '(711) 771-8960', '1184 Paul Wayne Haggerty Road', '', '', false, false);
INSERT INTO public.voter VALUES (4, 'Gautstafr', 'Vidar', 43, 'M', 2, '(979) 587-6983', '4551 Gateway Avenue', '', '', false, false);
INSERT INTO public.voter VALUES (5, 'Berthold', 'Ninhursag', 45, 'F', 2, '(725) 450-1105', '582 Jarvisville Road', '', '', false, false);
INSERT INTO public.voter VALUES (2, 'Vinayak', 'Jaiwant', 23, 'M', 2, '9482331581', 'Plot No.154, Near Jain Heritage School, 1st Phase,
Rani Chenamma Nagar, Belagavi 590008', 'defg', '1234', false, false);
INSERT INTO public.voter VALUES (7, 'Abhishek', 'Mudaliar', 22, 'M', 2, '6364063669', '303 c block ', 'ghij', '1234', false, false);
INSERT INTO public.voter VALUES (6, 'Adrian', 'Sutil', 23, 'M', 2, '9482331581 ', 'Belgaum', 'abcd', '1234', false, false);
INSERT INTO public.voter VALUES (8, 'Abhishek', 'Mudaliar', 22, 'M', 5, '6364063669', 'Girls hostel, opposite Kle dr ms sheshgiri college, udtambagh, belgaum', 'mnop', '1234', false, false);


--
-- TOC entry 3317 (class 0 OID 16958)
-- Dependencies: 209
-- Data for Name: voting_record; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.voting_record VALUES (25, '2022-06-25 18:43:14.957', 9, 10, 1);
INSERT INTO public.voting_record VALUES (26, '2022-06-25 18:43:18.539', 9, 10, 1);
INSERT INTO public.voting_record VALUES (27, '2022-06-25 18:43:22.05', 9, 10, 1);
INSERT INTO public.voting_record VALUES (28, '2022-06-25 18:43:38.406', 9, 10, 1);


--
-- TOC entry 3335 (class 0 OID 0)
-- Dependencies: 201
-- Name: candidate_candidate_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.candidate_candidate_id_seq', 11, true);


--
-- TOC entry 3336 (class 0 OID 0)
-- Dependencies: 210
-- Name: election_record_record_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.election_record_record_id_seq', 1, false);


--
-- TOC entry 3337 (class 0 OID 0)
-- Dependencies: 204
-- Name: voter_voter_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.voter_voter_id_seq', 9, true);


--
-- TOC entry 3338 (class 0 OID 0)
-- Dependencies: 208
-- Name: voting_record_candidate_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.voting_record_candidate_id_seq', 1, false);


--
-- TOC entry 3339 (class 0 OID 0)
-- Dependencies: 212
-- Name: voting_record_record_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.voting_record_record_id_seq', 1, false);


--
-- TOC entry 3340 (class 0 OID 0)
-- Dependencies: 206
-- Name: voting_record_vote_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.voting_record_vote_id_seq', 28, true);


--
-- TOC entry 3341 (class 0 OID 0)
-- Dependencies: 207
-- Name: voting_record_voter_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.voting_record_voter_id_seq', 1, true);


--
-- TOC entry 3160 (class 2606 OID 16815)
-- Name: area_codes area_codes_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.area_codes
    ADD CONSTRAINT area_codes_pk PRIMARY KEY (area_code_id);


--
-- TOC entry 3163 (class 2606 OID 16826)
-- Name: candidate candidate_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.candidate
    ADD CONSTRAINT candidate_pk PRIMARY KEY (candidate_id);


--
-- TOC entry 3171 (class 2606 OID 16984)
-- Name: election_record election_record_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.election_record
    ADD CONSTRAINT election_record_pk PRIMARY KEY (record_id);


--
-- TOC entry 3165 (class 2606 OID 16840)
-- Name: party party_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.party
    ADD CONSTRAINT party_pk PRIMARY KEY (party_id);


--
-- TOC entry 3167 (class 2606 OID 16946)
-- Name: voter voter_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.voter
    ADD CONSTRAINT voter_pk PRIMARY KEY (voter_id);


--
-- TOC entry 3169 (class 2606 OID 16975)
-- Name: voting_record voting_record_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.voting_record
    ADD CONSTRAINT voting_record_pk PRIMARY KEY (vote_id);


--
-- TOC entry 3161 (class 1259 OID 16832)
-- Name: candidate_candidate_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX candidate_candidate_id_idx ON public.candidate USING btree (candidate_id);


--
-- TOC entry 3172 (class 2606 OID 16827)
-- Name: candidate candidate_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.candidate
    ADD CONSTRAINT candidate_fk FOREIGN KEY (candidate_area_code_id) REFERENCES public.area_codes(area_code_id);


--
-- TOC entry 3175 (class 2606 OID 16964)
-- Name: voting_record candidate_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.voting_record
    ADD CONSTRAINT candidate_fk FOREIGN KEY (candidate_id) REFERENCES public.candidate(candidate_id);


--
-- TOC entry 3173 (class 2606 OID 16841)
-- Name: candidate candidate_party_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.candidate
    ADD CONSTRAINT candidate_party_id_fk FOREIGN KEY (candidate_party_id) REFERENCES public.party(party_id);


--
-- TOC entry 3177 (class 2606 OID 16992)
-- Name: voting_record record_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.voting_record
    ADD CONSTRAINT record_id FOREIGN KEY (record_id) REFERENCES public.election_record(record_id);


--
-- TOC entry 3174 (class 2606 OID 16947)
-- Name: voter voter_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.voter
    ADD CONSTRAINT voter_fk FOREIGN KEY (voter_area_code_id) REFERENCES public.area_codes(area_code_id);


--
-- TOC entry 3176 (class 2606 OID 16969)
-- Name: voting_record voting_record_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.voting_record
    ADD CONSTRAINT voting_record_fk FOREIGN KEY (voter_id) REFERENCES public.voter(voter_id);


-- Completed on 2022-06-25 19:46:32 IST

--
-- PostgreSQL database dump complete
--


INSERT INTO users (name, email, password)
VALUES ('Ken Jones', 'ken.jones@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Sunil Siwach', 'sunil.siwach@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Lance Kelly', 'lance.kelly@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Helen Kuipers', 'helen.kuipers@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Michelle Duerr', 'michelle.duerr@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (2, 'luxury one-room en-suite', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, maiores!', 'http://url/url', 'http://url/url2', 56, 1, 1, 1, 'Canada', '1 Street', 'Calgary', 'Alberta', 'T2B 1G5', TRUE),
(3, 'luxury two-bedroom en-suite', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor neque recusandae delectus error quis voluptatem.', 'http://url/url3', 'http://url/url4', 76, 1, 2, 2, 'Canada', '2 Street', 'Calgary', 'Alberta', 'T2B 1H5', TRUE),
(5, 'luxury one-room en-suite', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, maiores!', 'http://url/url', 'http://url5/url6', 56, 1, 1, 1, 'Canada', '4 Street', 'Edmonton', 'Alberta', 'T3A 1M5', FALSE),
(1, 'luxury en-suite', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, maiores!', 'http://url/url', 'http://url/url2', 34, 0, 1, 1, 'Canada', '3 Street', 'Calgary', 'Alberta', 'T2B 1L2', TRUE);

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2020-03-12', '2020-03-22', 2, 1),
('2020-03-04', '2020-03-12', 3, 4),
('2020-05-18', '2020-06-29', 1, 2),
('2021-01-07', '2021-03-12', 4, 3);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (1, 3, 1, 5, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum dicta amet beatae exercitationem. Sed velit sunt quod dignissimos consequuntur repellendus.'),
(3, 2, 4, 7, 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam modi quam aliquid.'),
(2, 1, 3, 2, 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus cupiditate commodi beatae laborum, consequuntur consequatur. Consequuntur, recusandae corporis reiciendis saepe dicta adipisci quae distinctio doloribus.'),
(5, 4, 2, 8, 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit enim atque illum eveniet rerum reiciendis!');


